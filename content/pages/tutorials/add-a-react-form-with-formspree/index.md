---
updated: 2021-11-30
difficulty: Beginner
content_type: 📝 Tutorial
pcx-content-type: tutorial
title: Add a React form with Formspree
---

# Add a React form with Formspree

Almost every React website needs a form to collect user data. [Formspree](https://formspree.io/) is a back-end service that handles form processing and storage, allowing developers to include forms on their website without writing server-side code or functions.

In this tutorial, you will create a `<form>` component using React and add it to a single page application built with `create-react-app`. Though you are using `create-react-app` (CRA), the concepts will apply to any React framework including Next.js, Gatsby, and more. You will use Formspree to collect the submitted data and send out email notifications when new submissions arrive, without requiring any server-side coding.

You will deploy your site to Cloudflare Pages. Refer to the [Get started guide](/pages/get-started/) to familiarize yourself with the platform.

## Setup

To begin, create a new React project on your local machine with `create-react-app`. Then create a [new GitHub repository](https://repo.new/), and attach the GitHub location as a remote destination:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment CodeBlock--token-unselectable"># create new project with create-react-app</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">npx create-react-app new-app</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment CodeBlock--token-unselectable"># enter new directory</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">cd new-app</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment CodeBlock--token-unselectable"># attach git remote</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">git remote add origin git@github.com:&ltusername&gt/&ltrepo&gt.git</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment CodeBlock--token-unselectable"># change default branch name</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">git branch -M main</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

You may now modify the React application in the `new-app` directory you created.

## The front-end code

The starting point for `create-react-app` includes a simple Hello World website. You will be adding a Contact Us form that accepts a name, email address, and message. The form code is adapted from the HTML Forms tutorial. For a more in-depth explanation of how HTML forms work and additional learning resources, refer to the [HTML Forms tutorial](/pages/tutorials/forms/).

First, create a new react component called `ContactForm.js` and place it in the `src` folder alongside `App.js`.

    project-root/
    ├─ package.json
    └─ src/
       ├─ ContactForm.js
       ├─ App.js
       └─ ...

Next, you will build the form component using a helper library from Formspree, [`@formspree/react`](https://github.com/formspree/formspree-react). This library contains a `useForm` hook to simplify the process of handling form submission events and managing form state.

Install it with:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">npm</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-function">install</span><span class="CodeBlock--token-plain"> --save @formspree/react</span></div></span></span></span></code></pre>{{</raw>}}

Then paste the following code snippet into the `ContactForm.js` file:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-jsx" language="jsx"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">import { useForm, ValidationError } from '@formspree/react';</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">export default function ContactForm() {</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  const [state, handleSubmit] = useForm('YOUR_FORM_ID');</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  if (state.succeeded) {</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    return &ltp&gtThanks for your submission!&lt/p&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  }</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  return (</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    &ltform method=&quot;POST&quot; onSubmit={handleSubmit}&gt</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">      &ltlabel htmlFor=&quot;name&quot;&gtFull Name&lt/label&gt</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">      &ltinput id=&quot;name&quot; type=&quot;text&quot; name=&quot;name&quot; required /&gt</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">      &ltValidationError prefix=&quot;Name&quot; field=&quot;name&quot; errors={state.errors} /&gt</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">      &ltlabel htmlFor=&quot;email&quot;&gtEmail Address&lt/label&gt</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">      &ltinput id=&quot;email&quot; type=&quot;email&quot; name=&quot;email&quot; required /&gt</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">      &ltValidationError prefix=&quot;Email&quot; field=&quot;email&quot; errors={state.errors} /&gt</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">      &ltlabel for=&quot;message&quot;&gtMessage&lt/label&gt</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">      &lttextarea id=&quot;message&quot; name=&quot;message&quot; required&gt&lt/textarea&gt</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">      &ltValidationError prefix=&quot;Message&quot; field=&quot;message&quot; errors={state.errors} /&gt</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">      &ltbutton type=&quot;submit&quot; disabled={state.submitting}&gt</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">        Submit</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">      &lt/button&gt</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">      &ltValidationError errors={state.errors} /&gt</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    &lt/form&gt</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  );</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">}</span></div></span></span></span></code></pre>{{</raw>}}

Currently, the form contains a placeholder `YOUR_FORM_ID`. You replace this with your own form endpoint later in this tutorial.

The `useForm` hook returns a `state` object and a `handleSubmit` function which you pass to the `onSubmit` form attribute. Combined, these provide a way to submit the form data via AJAX and update form state depending on the response received.

For clarity, this form does not include any styling, but in the GitHub project (<https://github.com/formspree/formspree-example-cloudflare-react>) you can review an example of how to apply styles to the form.

{{<Aside type="note">}}

`ValidationError` components are helpers that display error messages for field errors, or general form errors (if no `field` attribute is provided). For more information on validation, refer to the [Formspree React documentation](https://help.formspree.io/hc/en-us/articles/360055613373-The-Formspree-React-library#validation).

{{</Aside>}}

To add this form to your website, import the component:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-jsx" language="jsx"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">import ContactForm from './ContactForm';</span></div></span></span></span></code></pre>{{</raw>}}

Then insert the form into the page as a react component:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-jsx" language="jsx"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&ltContactForm /&gt</span></div></span></span></span></code></pre>{{</raw>}}

For example, you can update your `src/App.js` file to add the form:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-jsx" language="jsx"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">import ContactForm from './ContactForm'; // &lt-- import the form component</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">import logo from './logo.svg';</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">import './App.css';</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">function App() {</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  return (</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    &ltdiv className=&quot;App&quot;&gt</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">      &ltheader className=&quot;App-header&quot;&gt</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">        &ltimg src={logo} className=&quot;App-logo&quot; alt=&quot;logo&quot; /&gt</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">        &ltp&gt</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">          Edit &ltcode&gtsrc/App.js&lt/code&gt and save to reload.</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">        &lt/p&gt</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">        &lta</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">          className=&quot;App-link&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">          href=&quot;https://reactjs.org&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">          target=&quot;_blank&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">          rel=&quot;noopener noreferrer&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">        &gt</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">          Learn React</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">        &lt/a&gt</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">        {/* your contact form component goes here */}</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">        &ltContactForm /&gt</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">      &lt/header&gt</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    &lt/div&gt</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  );</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">}</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">export default App;</span></div></span></span></span></code></pre>{{</raw>}}

Now you have a single-page application containing a Contact Us form with several fields for the user to fill out. However, you have not set up the form to submit to a valid form endpoint yet. You will do that in the [next section](#the-formspree-back-end).

{{<Aside type="info" header="GitHub repository">}}

The source code for this example is [available on GitHub](https://github.com/formspree/formspree-example-cloudflare-react). It is a live Pages application with a [live demo](https://formspree-example-cloudflare-react.pages.dev/) available, too.

{{</Aside>}}

## The Formspree back end

The React form is complete, however, when the user submits this form, they will get a `Form not found` error. To fix this, create a new Formspree form, and copy its unique ID into the form's `useForm` invocation.

To create a Formspree form, sign up for [an account on Formspree](https://formspree.io/register). Then create a new form with the **+ New form** button. Name your new form `Contact-us form` and update the recipient email to an email where you wish to receive your form submissions. Finally, select **Create Form**.

![Creating a Formspree form](./new-form-dialog.png)

You will be presented with instructions on how to integrate your new form. Copy the form’s `hashid` (the last 8 alphanumeric characters from the URL) and paste it into the `useForm` function in the `ContactForm` component you created above.

![Newly generated form endpoint that you can copy to use in the ContactForm component](./form-endpoint.png)

Your component should now have a line like this:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-jsx" language="jsx"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">const [state, handleSubmit] = useForm('mqldaqwx');</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">/* replace the random-like string above with your own form's ID */</span></div></span></span></span></code></pre>{{</raw>}}

Now when you submit your form, you should be shown a Thank You message. The form data will be submitted to your account on [Formspree.io](https://formspree.io/).

From here you can adjust your form processing logic to update the [notification email address](https://help.formspree.io/hc/en-us/articles/115008379348-Changing-a-form-email-address), or add plugins like [Google Sheets](https://help.formspree.io/hc/en-us/articles/360036563573-Use-Google-Sheets-to-send-your-submissions-to-a-spreadsheet), [Slack](https://help.formspree.io/hc/en-us/articles/360045648933-Send-Slack-notifications), and more.

For more help setting up Formspree, refer to the following resources:

- For general help with Formspree, refer to the [Formspree help site](https://help.formspree.io/hc/en-us).
- For more help creating forms in React, refer to the [formspree-react documentation](https://help.formspree.io/hc/en-us/articles/360055613373-The-Formspree-React-library)
- For tips on integrating Formspree with popular platforms like Next.js, Gatsby and Eleventy, refer to the [Formspree guides](https://formspree.io/guides).

## Deployment

You are now ready to deploy your project.

If you have not already done so, save your progress within `git` and then push the commit(s) to the GitHub repository:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment CodeBlock--token-unselectable"># Add all files</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">git add -A</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment CodeBlock--token-unselectable"># Commit w/ message</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">git commit -m &quot;working example&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment CodeBlock--token-unselectable"># Push commit(s) to remote</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">git push -u origin main</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Your work now resides within the GitHub repository, which means that Pages is able to access it too.

If this is your first Cloudflare Pages project, refer to the [Get started guide](/pages/get-started/) for a complete walkthrough. After selecting the appropriate GitHub repository, you must configure your project with the following build settings:

- **Project name** – Your choice
- **Production branch** – `main`
- **Framework preset** – Create React App
- **Build command** – `npm run build`
- **Build output directory** – `build`

After selecting **Save and Deploy**, your Pages project will begin its first deployment. When successful, you will be presented with a unique `*.pages.dev` subdomain and a link to your live demo.

## Using environment variables with forms

Sometimes it is helpful to set up two forms, one for development, and one for production. That way you can develop and test your form without corrupting your production dataset, or sending test notifications to clients.

To set up production and development forms first create a second form in Formspree. Name this form Contact Us Testing, and note the form's [`hashid`](https://help.formspree.io/hc/en-us/articles/360015130174-Getting-your-form-s-hashid-).

Then change the `useForm` hook in your `ContactForm.js` file so that it is initialized with an environment variable, rather than a string:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-jsx" language="jsx"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">const [state, handleSubmit] = useForm(process.env.REACT_APP_FORM_ID);</span></div></span></span></span></code></pre>{{</raw>}}

In your Cloudflare Pages project settings, add the `REACT_APP_FORM_ID` environment variable to both the Production and Preview environments. Use your original form's `hashid` for Production, and the new test form's `hashid` for the Preview environment:

![Edit option for environment variables in your Production and Preview environments](./env-vars.png)

Now, when you commit and push changes to a branch of your git repository, a new preview app will be created with a form that submits to the test form URL. However, your production website will continue to submit to the original form URL.

{{<Aside type="note">}}

Create React App uses the prefix `REACT_APP_` to designate environment variables that are accessible to front-end JavaScript code. A different framework will use a different prefix to expose environment variables. For example, in the case of Next.js, the prefix is `NEXT_PUBLIC_`. Consult the documentation of your front-end framework to determine how to access environment variables from your React code.

{{</Aside>}}

In this tutorial, you built and deployed a website using Cloudflare Pages and Formspree to handle form submissions. You created a React application with a form that communicates with Formspree to process and store submission requests and send notifications.

If you would like to review the full source code for this application, you can find it on [GitHub](https://github.com/formspree/formspree-example-cloudflare-react).

## Related resources

- [Add an HTML form with Formspree](/pages/tutorials/add-an-html-form-with-formspree/)
- [HTML Forms](/pages/tutorials/forms/)
