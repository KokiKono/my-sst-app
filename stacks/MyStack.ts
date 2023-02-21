import { StackContext, Table, NextjsSite } from "sst/constructs";

export function MyStack({ stack, app }: StackContext) {
  // Create the table
  const table = new Table(stack, "Counter", {
    fields: {
      counter: "string",
    },
    primaryIndex: { partitionKey: "counter" },
  });

  const site = new NextjsSite(stack, "Site", {
    path: "frontend",
    environment: {
      // Pass the table details to our app
      REGION: app.region,
      TABLE_NAME: table.tableName,
      NEXT_PUBLIC_APP_NAME: 'my-sst-app'
    },
    dev: {
      deploy: false
    }
  });
  
  // Allow the Next.js API to access the table
  site.attachPermissions([table]);
  
  // Show the site URL in the output
  stack.addOutputs({
    URL: site.url ?? 'test-koki',
  });
  
  
}
