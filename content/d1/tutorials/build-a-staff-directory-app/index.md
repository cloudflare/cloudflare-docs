---
updated: 2024-03-21
difficulty: Intermediate
content_type: 📝 Tutorial
pcx_content_type: tutorial
title: Build a Staff Directory Application
---

# Build a Staff Directory with D1, Cloudflare Pages and HonoX

In this tutorial, you will learn how to use D1 to build a staff directory. This application will allow users to access information about an organization's employees and give admins the ability to add new employees directly within the app. 
To do this, you will first need to set up a [D1 database](/d1/get-started/) to manage data seamlessly, then you will develop and deploy your application using the [HonoX Framework](https://github.com/honojs/honox) and [Cloudflare Pages](/pages).

## Prerequisites

Before moving forward with this tutorial, make sure you have the following:

- A Cloudflare account, if you do not have one, [sign up](https://dash.cloudflare.com/sign-up/workers-and-pages) before continuing.
- A recent version of [npm](https://docs.npmjs.com/getting-started) installed.

If you do not want to go through with the setup now, [view the completed code](https://github.com/lauragift21/staff-directory) on GitHub.

## 1. Install HonoX

In this tutorial, you will use [HonoX](https://github.com/honojs/honox), a meta-framework for creating full-stack websites and Web APIs to build your application. To use HonoX in your project, run the `hono-create` command. 

To get started, run the following command:

```sh
$ npm create hono@latest
```

During the setup process, you'll be asked to provide a name for your project directory and to choose a template. When making your selection, opt for the `x-basic` template.

## 2. Initialize your HonoX application

Once your project is set up, you can see a list of generated files below, this is a typical project structure for a HonoX application:

```
.
├── app
│   ├── global.d.ts // global type definitions
│   ├── routes
│   │   ├── _404.tsx // not found page
│   │   ├── _error.tsx // error page
│   │   ├── _renderer.tsx // renderer definition
│   │   ├── about
│   │   │   └── [name].tsx // matches `/about/:name`
│   │   └── index.tsx // matches `/`
│   └── server.ts // server entry file
├── package.json
├── tsconfig.json
└── vite.config.ts
```

The project includes directories for app code, routes, and server setup, alongside configuration files for package management, TypeScript, and Vite.

## 3. Create a Database

To create a database for your project, use the Cloudflare CLI tool, [Wrangler](/workers/wrangler), which supports the `wrangler d1` command for D1 database operations. Create a new database named `staff-directory` with the following command:

```sh
$ npx wrangler d1 create staff-directory
```

After creating your database, you will need to set up a [binding](/workers/configuration/bindings/) in the Wrangler configuration file to integrate your database with your application. 

This binding enables your application to interact with Cloudflare resources such as D1 databases, KV namespaces, and R2 buckets. To configure this, create a `wrangler.toml` file in your project's root directory and input the basic setup information:

```toml
---
filename: wrangler.toml
---
name = "staff-directory"
compatibility_date = "2023-12-01"
```

Next, add the database binding details to your `wrangler.toml` file. This involves specifying a binding name (in this case, `DB`), which will be used to reference the database within your application, along with the `database_name` and `database_id` provided when you created the database:

```toml
---
filename: wrangler.toml
---
[[d1_databases]]
binding = "DB"
database_name = "staff-directory"
database_id = "f495af5f-dd71-4554-9974-97bdda7137b3"
```

With these configurations in place, your application is now set up to access and interact with your D1 database, either through the command line or directly within your codebase.

You'll also need to make adjustments to your Vite config file in `vite.config.js`. Add the following config settings to ensure that Vite is properly set up to work with Cloudflare Bindings in local environment:

```ts
---
filename: vite.config.ts
---
import adapter from '@hono/vite-dev-server/cloudflare'

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      plugins: [client()]
    }
  } else {
    return {
      plugins: [honox({
	      devServer: {
		    adapter
	      }
      }), pages()]
    }
  }
})
```

## 4. Interact with D1

To interact with your D1 database, you can directly issue SQL commands using the `wrangler d1 execute` command:

```sh
$ wrangler d1 execute staff-directory --command "SELECT name FROM sqlite_schema WHERE type ='table'"
```

The command above allows you to run queries or operations directly from the command line. 

For operations such as initial data seeding or batch processing, you can pass a SQL file with your commands. To do this, create a `schema.sql` file in the root directory of your project and insert your SQL queries into this file:

```sql
---
filename: schema.sql
---
CREATE TABLE locations (
    location_id INTEGER PRIMARY KEY AUTOINCREMENT,
    location_name VARCHAR(255) NOT NULL
);

CREATE TABLE departments (
    department_id INTEGER PRIMARY KEY AUTOINCREMENT,
    department_name VARCHAR(255) NOT NULL
);

CREATE TABLE employees (
    employee_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    join_date DATE NOT NULL,
    location_id INTEGER REFERENCES locations(location_id),
    department_id INTEGER REFERENCES departments(department_id)
);

INSERT INTO locations (location_name) VALUES ('London, UK'), ('Paris, France'), ('Berlin, Germany'), ('Lagos, Nigeria'), ('Nairobi, Kenya'), ('Cairo, Egypt'), ('New York, NY'), ('San Francisco, CA'), ('Chicago, IL');

INSERT INTO departments (department_name) VALUES ('Software Engineering'), ('Product Management'), ('Information Technology (IT)'), ('Quality Assurance (QA)'), ('User Experience (UX)/User Interface (UI) Design'), ('Sales and Marketing'), ('Human Resources (HR)'), ('Customer Support'), ('Research and Development (R&D)'), ('Finance and Accounting');
```

The above queries will create three tables -  Locations, Departments, and Employees. To populate these tables with initial data, use the `INSERT INTO` command. After preparing your schema file with these commands, you can apply it to the D1 database. Do this by using the `--file` flag to specify the schema file for execution:

```sh
$ wrangler d1 execute staff-directory --file=./schema.sql
```

If you want to execute the schema locally and seed data into your local directory, you will need to pass the `--local` flag to the above command.


## 5. Create SQL Statements

After setting up your D1 database and configuring the `wrangler.toml` file as outlined in previous steps, your database is accessible in your code through the `DB` binding. This allows you to directly interact with the database by preparing and executing SQL statements. Let's look at how you can use this binding to perform common database operations such as retrieving data and inserting new records.

### Retrieving Data from Database

```ts
---
filename: db.ts
---
export const findAllEmployees = async (db: D1Database) => {
  const query = `
      SELECT employees.*, locations.location_name, departments.department_name 
      FROM employees
      JOIN locations ON employees.location_id = locations.location_id
      JOIN departments ON employees.department_id = departments.department_id
      `;
  const { results } = await db.prepare(query).all();
  const employees = results;
  return employees;
};
```
### Inserting Data into the Database

```ts
---
filename: db.ts
---
export const createEmployee = async (db: D1Database, employee: Employee) => {
  const query = `
      INSERT INTO employees (name, position, join_date, image_url, department_id, location_id)
      VALUES (?, ?, ?, ?, ?, ?)`;

  const results  = await db
    .prepare(query)
    .bind(employee.name, employee.position,  employee.join_date, employee.image_url, employee.department_id, employee.location_id)
    .run();
  const employees = results;
  return employees;
};
```

For a complete list of all the queries used in the application, please refer to the [db.ts](https://github.com/lauragift21/staff-directory/blob/main/app/db.ts) file in the codebase.

## 6. Developing the UI 

The application uses `hono/jsx` for rendering. You can set up a Renderer  in `app/routes/_renderer.tsx` using the JSX-rendered middleware, serving as the entry point for your application:

```ts
---
filename: _renderer.tsx
---
import { jsxRenderer } from 'hono/jsx-renderer'
import { Script } from 'honox/server'

export default jsxRenderer(({ children, title }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <Script src="/app/client.ts" async />
      </head>
      <body>{children}</body>
    </html>
  )
})
```

Add the bindings defined earlier in `global.d.ts` file where the global type definitions for TypeScript is defined ensuring type consistency across your application.

```ts
---
filename: global.d.ts
---
declare module 'hono' {
  interface Env {
    Variables: {}
    Bindings: {
      DB: D1Database
    }
  }
}
```

This application utilizes [Tailwind CSS](https://tailwindcss.com/) for styling, if you want to set it up, please refer to the TailwindCSS docs or follow the steps [provided here](https://github.com/honojs/honox?tab=readme-ov-file#using-tailwind-css).

To display a list of employees, you'll need to invoke the `findAllEmployees` function from your `db.ts` file and call that within the `routes/index.tsx` file.  The `createRoute()` function present in the file serves as a helper function for defining routes that handle different  HTTP methods like GET, POST, PUT, or DELETE.

```ts
---
filename: index.tsx
---
import { css } from 'hono/css'
import { createRoute } from 'honox/factory'
import Counter from '../islands/counter'

const className = css`
  font-family: sans-serif;
`

export default createRoute((c) => {
  const name = c.req.query('name') ?? 'Hono'
  return c.render(
    <div class={className}>
      <h1>Hello, {name}!</h1>
      <Counter />
    </div>,
    { title: name }
  )
})
```

The existing code within the file includes a placeholder that uses the Counter component. You should replace this section with the following code block:

```ts
---
highlight: [2-4, 19-21]
filename: index.tsx
---
import { createRoute } from 'honox/factory'
import type { FC } from 'hono/jsx'
import type { Employee } from '../db'
import { findAllEmployees, findAllDepartments, findAllLocations } from '../db'

const EmployeeCard: FC<{ employee: Employee }> = ({ employee }) => {
  const { employee_id, name, image_url, department_name, location_name } = employee;
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md">
      <a href={`/employee/${employee_id}`}>
        <img className="bg-indigo-600 p-4 rounded-t-lg" src={image_url} alt={name} />
        //...
      </a>
    </div>
  );
};

export const GET = createRoute(async (c) => {
  const employees = await findAllEmployees(c.env.DB)
  const locations = await findAllLocations(c.env.DB)
  const departments = await findAllDepartments(c.env.DB)
  return c.render(
    <section className="flex-grow">
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl mt-12">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-blue-600 from-sky-400">{`Directory `}</span>
      </h1>
      //...
      </section>
      <section className="flex flex-wrap -mx-4">
        {employees.map((employee) => (
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4">
            <EmployeeCard employee={employee} />
          </div>
        ))}
      </section>
    </section>
  )
})
```

The code snippet demonstrates how to import the `findAllEmployees`, `findAllLocations`, and `findAllDepartments` functions from the `db.ts` file and how to use the binding `c.env.DB` to invoke these functions. With this, you can retrieve and display the fetched data on the page.

### Add an Employee

Similarly, when setting up a route to add data to the database, for instance, allowing admins to create a new employee through the `/admin` page, you would follow the same approach but this time use the `export POST` route.

```ts
---
highlight: 26
filename: admin/create.tsx
---

import { createRoute } from 'honox/factory'
import type { Employee } from '../../db'
import { getFormDataValue, getFormDataNumber } from '../../utils/formData'
import { createEmployee } from '../../db'

export const POST = createRoute(async (c) => {
  try {
    const formData = await c.req.formData();
    const imageFile = formData.get('image_file');
    let imageUrl = '';
    
    // TODO: process image url with R2

    const employeeData: Employee = {
      employee_id: getFormDataValue(formData, 'employee_id'),
      name: getFormDataValue(formData, 'name'),
      position: getFormDataValue(formData, 'position'),
      image_url: imageUrl,
      join_date: getFormDataValue(formData, 'join_date'),
      department_id: getFormDataNumber(formData, 'department_id'),
      location_id: getFormDataNumber(formData, 'location_id'),
      location_name: '',
      department_name: ''
    };
  
    await createEmployee(c.env.DB, employeeData);
    return c.redirect('/', 303);
  } catch (error) {
    return new Response('Error processing your request', { status: 500 });
  }
});
```

### Store Images in R2

During the process of creating a new employee, the image uploaded can be stored in an R2 bucket prior to being added to the database. 

This involves creating an R2 bucket, uploading the image to this bucket, and then obtaining a public URL for the image from the bucket. This URL is then saved in your database, linking to the image stored in the R2 bucket.

First, we need to create a bucket using `wrangler r2 bucket create`:

```sh
$ wrangler r2 bucket create employee-avatars
```

Once the bucket is created add the R2 bucket binding to your `wrangler.toml`  file:

```toml
---
filename: wrangler.toml
---

[[r2_buckets]]
binding = "MY_BUCKET"
bucket_name = "employee-avatars"
```

Also pass the R2 binding to the `global.d.ts` file:

```ts
---
filename: global.d.ts
---
declare module 'hono' {
 interface Env {
    Variables: {}
    Bindings: {
      DB: D1Database,
      MY_BUCKET: R2Bucket
    }
  }
}
```

To store the uploaded image in the R2 bucket, you can use the `put` method provided by R2. This method allows you to upload the image file to your bucket.

```ts
---
filename: admin/create.tsx
---

if (imageFile instanceof File) { 
  const key = `${new Date().getTime()}-${imageFile.name}`;
  const fileBuffer = await imageFile.arrayBuffer();

  await c.env.MY_BUCKET.put(key, fileBuffer, {
	httpMetadata: {
	  contentType: imageFile.type || 'application/octet-stream',
	},
  });
  console.log(`File uploaded successfully: ${key}`);
  imageUrl = `https://pub-8d936184779047cc96686a631f318fce.r2.dev/${key}`;
}
```

There you have it! The code examples have been shortened for brevity, please [refer to the codebase](https://github.com/lauragift21/staff-directory) for the full codebase. 

## 7. Deploy your HonoX application

With your application ready for deployment, you can use Wrangler to build and deploy your project to the Cloudflare Network. Ensure you are logged in to your Cloudflare account by running the `wrangler whoami` command. If you're not logged in, Wrangler will prompt you to login, by creating an API key that you can use to make authenticated requests automatically from your computer.

After successful login, confirm that your `wrangler.toml` file is configured similarly to the code block below:

```sh
name = "staff-directory"
compatibility_date = "2023-12-01"

[[r2_buckets]]
binding = "MY_BUCKET"
bucket_name = "employee-avatars"

[[d1_databases]]
binding = "DB"
database_name = "staff-directory"
database_id = "f495af5f-dd71-4554-9974-97bdda7137b3"
```

Now, run `wrangler deploy` to deploy your project to Cloudflare. After deployment you can test your application is working by navigating to the deployed URL provided for you. You should see an application with the base frontend we created. You don't have any data populated in your database so you can navigate to the `/admin` page to add a new employee and this should return a new employee in your home page.

## Conclusion

In this tutorial, you built a staff directory application where users can view all employees within an organization. To see the full source code for this application, you can visit the [repository](https://github.com/lauragift21/staff-directory). 

![staff directory demo](https://github.com/lauragift21/staff-directory/raw/main/demo.gif)