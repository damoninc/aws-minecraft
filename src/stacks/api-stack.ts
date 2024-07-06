import { Stack, StackProps } from "aws-cdk-lib";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";

interface ApiProps extends StackProps {
  startLambda: NodejsFunction;
  stopLambda: NodejsFunction;
}

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, params: ApiProps) {
    super(scope, id, params);

    const api = new RestApi(this, "MinecraftEC2ServiceApi", {
      restApiName: "MinecraftEC2ServiceApi",
      description: "Does the API things!",
    });

    api.root.addResource("startLambda").addMethod(
      "POST",
      new LambdaIntegration(params.startLambda, {
        requestTemplates: {
          "applicatiion/json": JSON.stringify({ statusCode: "200" }),
        },
      })
    );

    api.root.addResource("stopLambda").addMethod(
      "POST",
      new LambdaIntegration(params.stopLambda, {
        requestTemplates: {
          "applicatiion/json": JSON.stringify({ statusCode: "200" }),
        },
      })
    );
  }
}
