
# .npmignore:

This file is used to tell npm which files should be kept outside of the package.

# handler.js: 

This declares your Lambda function. 

# serverless.yml: 

This file declares configuration that Serverless Framework uses to create your service. *serverless.yml* file has three sections — *provider, functions, and resources*.

## provider:

This section declares configuration specific to a cloud provider. You can use it to specify name of the cloud provider, region, runtime etc.

## functions: 

This section is used to specify all the functions that your service is composed off. A service can be composed of one or more functions.

## resources: 

This section declares all the resources that your functions use. Resources are declared using AWS CloudFormation.
