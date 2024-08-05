---
title: Add a site
pcx_content_type: tutorial
weight: 1
meta:
  title: Add a site
languages:
  - JavaScript
  - TypeScript
  - Python
updated: 2024-08-02
---

# Add site to Cloudflare

{{<tutorial-date-info>}}

In this tutorial, you will go through step-by-step instructions to bring an existing site to Cloudflare using Pulumi Infrastructure as Code (IaC) so that you can become familiar with the resource management lifecycle. In particular, you will create a Zone and a DNS record to resolve your newly added site. This tutorial adopts the IaC principle to complete the steps listed in the [Add site tutorial](/fundamentals/setup/manage-domains/add-site/).

{{<Aside type="note">}}
You will provision resources that qualify under free tier offerings for both Pulumi Cloud and Cloudflare.
{{</Aside>}}

{{<tutorial>}}
{{<tutorial-prereqs>}}

Ensure you have:

* A Cloudflare account and API Token with permission to edit the resources in this tutorial. If you need to, sign up for a [Cloudflare account](https://dash.cloudflare.com/sign-up/workers-and-pages) before continuing. Your token must have:
  * `Zone-Zone-Edit` permission
  * `Zone-DNS-Edit` permission
  * `include-All zones from an account-<your account>` zone resource
* A Pulumi Cloud account. You can sign up for an [always-free, individual tier](https://app.pulumi.com/signup).
* The [Pulumi CLI](/pulumi/installing/) is installed on your machine.
* A [Pulumi-supported programming language](https://github.com/pulumi/pulumi?tab=readme-ov-file#languages) is configured. (TypeScript, JavaScript, Python, Go, .NET, Java, or use YAML)
* A domain name. You may use `example.com` to complete the tutorial.

{{</tutorial-prereqs>}}
{{<tutorial-step title="Initialize Pulumi">}}

### a. Create a directory

Use a new and empty directory for this tutorial.

```sh
$ mkdir addsite-cloudflare
$ cd addsite-cloudflare
```

### b. Login

At the prompt, press Enter to log into your Pulumi Cloud account via the browser. Alternatively, you may provide a [Pulumi Cloud access token](https://www.pulumi.com/docs/pulumi-cloud/access-management/access-tokens/).

```sh
$ pulumi login
```

### c. Create a program

{{<Aside type="note">}}
A Pulumi program is code written in a [supported programming language](https://github.com/pulumi/pulumi?tab=readme-ov-file#languages) that defines infrastructure resources.
{{</Aside>}}

To create a program, select your language of choice and run the `pulumi` command:

{{<tabs labels="js | ts | py | Go | Java | .NET | YAML">}}
{{<tab label="js" default="true">}}

```sh
$ pulumi new javascript --name addsite-cloudflare --yes
# wait a few seconds while the project is initialized
```

{{</tab>}}
{{<tab label="ts">}}

```sh
$ pulumi new typescript --name addsite-cloudflare --yes
# wait a few seconds while the project is initialized
```

{{</tab>}}
{{<tab label="py">}}

```sh
$ pulumi new python --name addsite-cloudflare --yes
# wait a few seconds while the project is initialized
```

{{</tab>}}
{{<tab label="go">}}

```sh
$ pulumi new go --name addsite-cloudflare --yes
# wait a few seconds while the project is initialized
```

{{</tab>}}
{{<tab label="Java">}}

```sh
$ pulumi new java --name addsite-cloudflare --yes
# wait a few seconds while the project is initialized
```

{{</tab>}}
{{<tab label=".NET">}}

```sh
$ pulumi new csharp --name addsite-cloudflare --yes
# wait a few seconds while the project is initialized
```

{{</tab>}}
{{<tab label="YAML">}}

```sh
$ pulumi new yaml --name addsite-cloudflare --yes
```

{{</tab>}}
{{</tabs>}}

### d. Save your settings

You will need:

- Your Cloudflare [account ID](/fundamentals/setup/find-account-and-zone-ids/).
- A valid Cloudflare API [token](/fundamentals/api/get-started/create-token/).
- A domain. For instance, `example.com`.

{{<Aside type="note">}}
A Pulumi [ESC Environment](https://www.pulumi.com/docs/esc/environments/) is a YAML file containing configurations and secrets that pertain to your application and infrastructure. These can be accessed in several ways, including a Pulumi program. All ESC Environments reside in your Pulumi Cloud account.
{{</Aside>}}

```sh
# Define an ESC Environment name
$ E=my-dev-env

# Create a new Pulumi ESC Environment
$ pulumi config env init --env $E --yes --stack dev

# Replace API_TOKEN with your Cloudflare API Token
$ pulumi env set $E --secret  pulumiConfig.cloudflare:apiToken API_TOKEN

# Replace abc123 with your Cloudflare Account ID
$ pulumi env set $E --plaintext pulumiConfig.accountId abc123

# Replace example.com with your registered domain, or leave as is
$ pulumi env set $E --plaintext pulumiConfig.domain example.com

# Review your ESC Environment
$ pulumi env open $E
{
  "pulumiConfig": {
    "accountId": "111222333",
    "cloudflare:apiToken": "abc123abc123",
    "domain": "example.com"
  }
}
```

### e. Create a stack

{{<Aside type="note">}}
A Pulumi [stack](https://www.pulumi.com/docs/concepts/stack/) is an instance of a Pulumi program. Stacks are independently configurable and may represent different environments (development, staging, production) or feature branches. For this tutorial, you'll use the `dev` stack.
{{</Aside>}}

To instantiate your `dev` stack, run:

```sh
$ pulumi up --yes --stack dev
# wait a few seconds for the stack to be instantiated.
```

At this point, you have not defined any resources so you'll have an empty stack.

{{</tutorial-step>}}
{{<tutorial-step title="Add a Zone">}}
{{<Aside type="note">}}
A domain, or site, is known as a Zone in Cloudflare.
{{</Aside>}}

You will now add the Pulumi Cloudflare package and a Cloudflare Zone resource to your Pulumi program.

### a. Install dependencies

{{<tabs labels="js | ts | py | Go | Java | .NET | YAML">}}
{{<tab label="js" default="true">}}

```sh
$ npm install @pulumi/cloudflare
added 1 package ...
```

{{</tab>}}
{{<tab label="ts">}}

```sh
$ npm install @pulumi/cloudflare
added 1 package ...
```

{{</tab>}}
{{<tab label="py">}}

```sh
$ echo "pulumi_cloudflare>=5.35,<6.0.0" >> requirements.txt
$ source venv/bin/activate
$ pip install -r requirements.txt
...
Collecting pulumi-cloudflare
...
```

{{</tab>}}
{{<tab label="go">}}

```sh
$ go get github.com/pulumi/pulumi-cloudflare/sdk/v3/go/cloudflare
go: downloading github.com/pulumi/pulumi-cloudflare ...
```

{{</tab>}}
{{<tab label="Java" no-code="true">}}

Below are Apache Maven instructions. For other Java project managers such as Gradle, see the official [Maven repository](https://central.sonatype.com/artifact/com.pulumi/cloudflare/overview)

1. Open your `pom.xml` file.
2. Add the Pulumi Cloudflare dependency inside the `<dependencies>` section.

```xml
<dependency>
    <groupId>com.pulumi</groupId>
    <artifactId>cloudflare</artifactId>
    <version>5.35.1</version>
</dependency>
```

1. Run:

```sh
$ mvn clean install
...
[INFO] BUILD SUCCESS
...
```

{{</tab>}}
{{<tab label=".NET">}}

```sh
$ dotnet add package Pulumi.Cloudflare
...
info : Adding PackageReference for package 'Pulumi.Cloudflare' into project
...
```

{{</tab>}}
{{<tab label="YAML" no-code="true">}}

There are no dependencies to download for YAML. Skip ahead.

{{</tab>}}
{{</tabs>}}

### b. Modify the program

Replace the contents of your entrypoint file with the following:

{{<tabs labels="js | ts | py | Go | Java | .NET | YAML">}}
{{<tab label="js" default="true">}}

```js
---
filename: index.js
---
"use strict";
const pulumi = require("@pulumi/pulumi");
const cloudflare = require("@pulumi/cloudflare");

const config = new pulumi.Config();
const accountId = config.require("accountId");
const domain = config.require("domain");

// Create a Cloudflare resource (Zone)
const zone = new cloudflare.Zone("my-zone", {
    zone: domain,
    accountId: accountId,
    plan: "free",
    jumpStart: true,
});

// Export the zone ID
exports.zoneId = zone.id;
```

{{</tab>}}
{{<tab label="ts">}}

```typescript
---
filename: index.ts
---
import * as pulumi from "@pulumi/pulumi";
import * as cloudflare from "@pulumi/cloudflare";

const config = new pulumi.Config();
const accountId = config.require("accountId");
const domain = config.require("domain")

// Create a Cloudflare resource (Zone)
const zone = new cloudflare.Zone("my-zone", {
    zone: domain,
    accountId: accountId,
    plan: "free",
    jumpStart: true,
});

// Export the zone ID
export const zoneId = zone.id;
```

{{</tab>}}
{{<tab label="py">}}

```py
---
filename: __main__.py
---
import pulumi
import pulumi_cloudflare as cloudflare

account_id = pulumi.Config().require("accountId")
domain = pulumi.Config().require("domain")

# Create a Cloudflare resource (Zone)
zone = cloudflare.Zone("my-zone",
    zone=domain,
    account_id=account_id,
    plan="free",
    jump_start=True)

# Export the zone ID
pulumi.export("zoneId", zone.id)
```

{{</tab>}}
{{<tab label="go">}}

```go
---
filename: main.go
---
package main

import (
    "github.com/pulumi/pulumi/sdk/v3/go/pulumi"
    cloudflare "github.com/pulumi/pulumi-cloudflare/sdk/v3/go/cloudflare"
)

func main() {
    pulumi.Run(func(ctx *pulumi.Context) error {
        domain, _ := ctx.GetConfig("domain")

        // Create a Cloudflare resource (Zone)
        zone, err := cloudflare.NewZone(ctx, "my-zone", &cloudflare.ZoneArgs{
            Zone:      pulumi.String(domain),
            Plan:      pulumi.String("free"),
            JumpStart: pulumi.Bool(true),
        })
        if err != nil {
            return err
        }

        // Export the zone ID
        ctx.Export("zoneId", zone.ID())
        return nil
    })
}
```

{{</tab>}}
{{<tab label="Java" no-code="true">}}

The entrypoint file is under the `src/main/java/myproject` directory.

```java
---
filename: App.java
---
package myproject;

import com.pulumi.Pulumi;
import com.pulumi.Context;
import com.pulumi.cloudflare.ZoneArgs;
import com.pulumi.cloudflare.Zone;


public class App {
    public static void main(String[] args) {
        Pulumi.run(ctx -> {
            var config = ctx.config();

            String accountId = config.require("accountId");
            String domain = config.require("domain");

            var zone = new Zone("my-zone", ZoneArgs.builder()
                .zone(domain)
                .accountId(accountId)
                .plan("free")
                .jumpStart(true)
                .build());

            ctx.export("zoneId", zone.id());
        });
    }
}
```

{{</tab>}}
{{<tab label=".NET">}}

```csharp
---
filename: Program.cs
---
using System.Threading.Tasks;
using Pulumi;
using Pulumi.Cloudflare;

class Program
{
    static Task<int> Main() => Deployment.RunAsync<MyStack>();

    class MyStack : Stack
    {
        public MyStack()
        {
            var config = new Pulumi.Config();
            var accountId = config.Require("accountId");
            var domain = config.Require("domain");

            var zone = new Zone("my-zone", new ZoneArgs
            {
                ZoneName = domain,
                AccountId = accountId,
                Plan = "free",
                JumpStart = true
            });

            this.ZoneId = zone.Id;
        }

        [Output]
        public Output<string> ZoneId { get; set; }
    }
}
```

{{</tab>}}
{{<tab label="YAML">}}

```yaml
---
filename: Pulumi.dev.yaml
---
environment:
  - my-dev-env

resources:
  myZone:
    type: cloudflare:Zone
    properties:
      zone: ${domain}
      accountId: ${accountId}
      plan: "free"
      jumpStart: true

outputs:
  zoneId: ${myZone.id}
```

{{</tab>}}
{{</tabs>}}

### c. Apply the changes

```sh
$ pulumi up --yes --stack dev
# wait a few seconds while the changes take effect
```

### d. (Optional) Review the zone

Review the value of `zoneId` to confirm the Zone creation.

```sh
$ pulumi stack output zoneId
d8fcb6d731fe1c2d75e2e8d6ad63fad5
```

{{</tutorial-step>}}
{{<tutorial-step title="Update your nameservers">}}

Once you have added a domain to Cloudflare, that domain will receive two assigned authoritative nameservers.

{{<Aside type="note">}}
This process makes Cloudflare your authoritative DNS provider, allowing your DNS queries and web traffic to be served from and protected by the Cloudflare network.

[Learn more about pending domains](/dns/zone-setups/reference/domain-status/)
{{</Aside>}}

### a. Update the program

Towards the end of your entrypoint file, below the `zoneId` variable, add the following:

{{<tabs labels="js | ts | py | Go | Java | .NET | YAML">}}
{{<tab label="js" default="true">}}

```js
---
filename: index.js
---
exports.nameservers = zone.nameServers;
exports.status = zone.status;
```

{{</tab>}}
{{<tab label="ts">}}

```typescript
---
filename: index.ts
---
export const nameservers = zone.nameServers;
export const status = zone.status;
```

{{</tab>}}
{{<tab label="py">}}

```py
---
filename: __main__.py
---
pulumi.export('nameservers', zone.name_servers)
pulumi.export('status', zone.status)
```

{{</tab>}}
{{<tab label="go">}}

```go
---
filename: main.go
---
ctx.Export("nameservers", zone.NameServers)
ctx.Export("status", zone.Status)
```

{{</tab>}}
{{<tab label="Java">}}

```java
---
filename: App.java
---
ctx.export("nameservers", zone.nameServers());
ctx.export("status", zone.status());
```

{{</tab>}}
{{<tab label=".NET" no-code="true">}}

1. Add `using System.Collections.Immutable;` at the top of your `Program.cs` file.
2. Below `this.ZoneId = zone.Id;`, add:

  ```csharp
  ---
  filename: Program.cs
  ---
  this.Nameservers = zone.NameServers;
  this.Status = zone.Status;
  ```

3. Below `public Output<string> ZoneId { get; set; }`, add:

  ```csharp
  ---
  filename: Program.cs
  ---
  public Output<ImmutableArray<string>> Nameservers { get; set; }
  public Output<string> Status { get; set; }
  ```

{{</tab>}}
{{<tab label="YAML">}}

```yaml
---
filename: Pulumi.dev.yaml
---
nameservers: ${exampleZone.nameServers}
status: ${exampleZone.status}
```

{{</tab>}}
{{</tabs>}}

### b. Apply the changes

```sh
$ pulumi up --yes --stack dev
```

### c. Obtain the nameservers

Review the value of `nameservers` to retrieve the assigned nameservers:

```sh
$ pulumi stack output --stack dev
```

### d. Update your registrar

{{<Aside type="note">}}
If you use `example.com` as your site, skip ahead to [Add a DNS record](#add-a-dns-record).
{{</Aside>}}

Update the nameservers at your registrar to activate Cloudflare services for your domain. Instructions are registrar-specific. You may be able to find guidance under [this consolidated list of common registrars](/dns/zone-setups/full-setup/setup/#update-your-registrar).

{{<Aside type="warning">}}
Registrars take up to 24 hours to process nameserver changes.
{{</Aside>}}

### e. Check your domain status

Once successfully registered, your domain `status` will change to `active`.

```sh
$ pulumi stack output
```

{{</tutorial-step>}}
{{<tutorial-step title="Add a DNS record">}}

You will now add a DNS record to your domain.

### a. Modify your program

Below is the final version of how your Pulumi program entrypoint file should look.
Replace the contents of your entrypoint file with the following:

{{<tabs labels="js | ts | py | Go | Java | .NET | YAML">}}
{{<tab label="js" default="true">}}

```js
---
filename: index.js
---
"use strict";
const pulumi = require("@pulumi/pulumi");
const cloudflare = require("@pulumi/cloudflare");

const config = new pulumi.Config();
const accountId = config.require("accountId");
const domain = config.require("domain");

// Create a Cloudflare resource (Zone)
const zone = new cloudflare.Zone("my-zone", {
    zone: domain,
    accountId: accountId,
    plan: "free",
    jumpStart: true,
});

// Export the zone ID
exports.zoneId = zone.id;
exports.nameservers = zone.nameServers;
exports.status = zone.status;

const record = new cloudflare.Record("my-record", {
  zoneId: zone.id,
  name: domain,
  value: "192.0.2.1",
  type: "A",
  proxied: true,
});
```

{{</tab>}}
{{<tab label="ts">}}

```typescript
---
filename: index.ts
---
import * as pulumi from "@pulumi/pulumi";
import * as cloudflare from "@pulumi/cloudflare";

const config = new pulumi.Config();
const accountId = config.require("accountId");
const domain = config.require("domain")

// Create a Cloudflare resource (Zone)
const zone = new cloudflare.Zone("my-zone", {
    zone: domain,
    accountId: accountId,
    plan: "free", // Choose the desired plan, e.g., "free", "pro", "business", etc.
    jumpStart: true,
});

// Export the zone ID
export const zoneId = zone.id;

// Export the Cloudflare-assigned nameservers.
export const nameservers = zone.nameServers;

// Export the status
export const status = zone.status;

// Set up a Record for your site
const record = new cloudflare.Record("my-record", {
    zoneId: zoneId,
    name: domain,
    value: "192.0.2.1",
    type: "A",
    proxied: true,
});
```

{{</tab>}}
{{<tab label="py">}}

```py
---
filename: __main__.py
---
import pulumi
import pulumi_cloudflare as cloudflare

account_id = pulumi.Config().require("accountId")
domain = pulumi.Config().require("domain")

# Create a Cloudflare resource (Zone)
zone = cloudflare.Zone("my-zone",
    zone=domain,
    account_id=account_id,
    plan="free",
    jump_start=True)

# Export the zone ID
pulumi.export("zoneId", zone.id)
pulumi.export('nameservers', zone.name_servers)
pulumi.export('status', zone.status)

record = cloudflare.Record("my-record",
    zone_id=zone.id,
    name=domain,
    value="192.0.2.1",
    type="A",
    proxied=True
)

```

{{</tab>}}
{{<tab label="go">}}

```go
---
filename: main.go
---
package main

import (
  cloudflare "github.com/pulumi/pulumi-cloudflare/sdk/v3/go/cloudflare"
  "github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
  pulumi.Run(func(ctx *pulumi.Context) error {
    domain, _ := ctx.GetConfig("domain")

    // Create a Cloudflare resource (Zone)
    zone, err := cloudflare.NewZone(ctx, "my-zone", &cloudflare.ZoneArgs{
      Zone:      pulumi.String(domain),
      Plan:      pulumi.String("free"),
      JumpStart: pulumi.Bool(true),
    })
    if err != nil {
      return err
    }

    // Export the zone ID
    ctx.Export("zoneId", zone.ID())
    ctx.Export("nameservers", zone.NameServers)
    ctx.Export("status", zone.Status)

    _, err = cloudflare.NewRecord(ctx, "my-record", &cloudflare.RecordArgs{
      ZoneId:  zone.ID(),
      Name:    pulumi.String(domain),
      Value:   pulumi.String("192.0.2.1"),
      Type:    pulumi.String("A"),
      Proxied: pulumi.Bool(true),
    })
    if err != nil {
      return err
    }

    return nil
  })
}

```

{{</tab>}}
{{<tab label="Java">}}

```java
---
filename: App.java
---
package myproject;

import com.pulumi.Pulumi;
import com.pulumi.Context;
import com.pulumi.cloudflare.ZoneArgs;
import com.pulumi.cloudflare.Zone;
import com.pulumi.cloudflare.Record;
import com.pulumi.cloudflare.RecordArgs;


public class App {
    public static void main(String[] args) {
        Pulumi.run(ctx -> {
            var config = ctx.config();

            String accountId = config.require("accountId");
            String domain = config.require("domain");

            var zone = new Zone("my-zone", ZoneArgs.builder()
                .zone(domain)
                .accountId(accountId)
                .plan("free")
                .jumpStart(true)
                .build());

            ctx.export("zoneId", zone.id());
            ctx.export("nameservers", zone.nameServers());
            ctx.export("status", zone.status());

            new Record("my-record", RecordArgs.builder()
            .zoneId(zone.id())
            .name(domain)
            .value("192.0.2.1")
            .type("A")
            .proxied(true)
            .build());
        });
    }
}
```

{{</tab>}}
{{<tab label=".NET">}}

```csharp
---
filename: Program.cs
---
using System.Collections.Immutable;
using System.Threading.Tasks;
using Pulumi;
using Pulumi.Cloudflare;

class Program
{
    static Task<int> Main() => Deployment.RunAsync<MyStack>();

    class MyStack : Stack
    {
        public MyStack()
        {
            var config = new Pulumi.Config();
            var accountId = config.Require("accountId");
            var domain = config.Require("domain");

            var zone = new Zone("my-zone", new ZoneArgs
            {
                ZoneName = domain,
                AccountId = accountId,
                Plan = "free",
                JumpStart = true
            });

            this.ZoneId = zone.Id;
            this.Nameservers = zone.NameServers;
            this.Status = zone.Status;

            new Record("my-record", new RecordArgs
            {
                ZoneId = zone.Id,
                Name = domain,
                Value = "192.0.2.1",
                Type = "A",
                Proxied = true
            });

        }

        [Output]
        public Output<string> ZoneId { get; set; }
        public Output<ImmutableArray<string>> Nameservers { get; set; }
        public Output<string> Status { get; set; }
    }
}
```

{{</tab>}}
{{<tab label="YAML">}}

```yaml
---
filename: Pulumi.dev.yaml
---
environment:
  - my-dev-env

resources:
  myZone:
    type: cloudflare:Zone
    properties:
      zone: ${domain}
      accountId: ${accountId}
      plan: "free"
      jumpStart: true

  myRecord:
    type: cloudflare:Record
    properties:
      zoneId: ${myZone.id}
      name: ${domain}
      value: 192.0.2.1
      type: A
      proxied: true
outputs:
  zoneId: ${myZone.id}
  nameservers: ${exampleZone.nameServers}
  status: ${exampleZone.status}
```

{{</tab>}}
{{</tabs>}}

### b. Apply the changes

```sh
$ pulumi up --yes --stack dev
```

{{</tutorial-step>}}
{{<tutorial-step title="(Optional) Verify your setup">}}

You will run two `nslookup` commands against the Cloudflare-assigned nameservers.

To test your site, run:

```sh
$ DOMAIN=$(pulumi config get domain)
$ NS1=$(pulumi stack output nameservers | jq '.[0]' -r)
$ NS2=$(pulumi stack output nameservers | jq '.[1]' -r)
$ nslookup $DOMAIN $NS1
$ nslookup $DOMAIN $NS2
```

For .NET use `Nameservers` as the Output.

Confirm your response returns the IP address(es) for your site.

{{</tutorial-step>}}
{{<tutorial-step title="Clean up">}}

In this last step, you will remove the resources and stack used throughout the tutorial.

### a. Delete the resources

```sh
$ pulumi destroy --yes
```

### b. Remove the stack

```sh
$ pulumi stack rm dev
```

{{</tutorial-step>}}
{{<tutorial-step title="Next steps">}}

You have incrementally defined Cloudflare resources needed to add a site to Cloudflare. After each new resource, you apply the changes to your `dev` stack via the `pulumi up` command. You declare the resources in your programming language of choice and let Pulumi handle the rest.

Follow the [Hello World tutorial](/pulumi/tutorial/hello-world/) to deploy a serverless app with Pulumi.

{{</tutorial-step>}}
{{</tutorial>}}
