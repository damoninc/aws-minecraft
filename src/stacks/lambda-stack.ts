import { Stack, StackProps } from "aws-cdk-lib";
import { Runtime, Code } from "aws-cdk-lib/aws-lambda";
import * as path from "path";
import { Construct } from "constructs";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

export class LambdaStack extends Stack {
  public startLambda: NodejsFunction;
  public stopLambda: NodejsFunction;

  constructor(scope: Construct, id: string, params: StackProps) {
    super(scope, id, params);

    this.startLambda = this.createLambdaFunction(
      "start-ec2",
      "start-ec2-lambda"
    );
    this.stopLambda = this.createLambdaFunction("stop-ec2", "stop-ec2-lambda");
  }

  private createLambdaFunction(
    lambdaName: string,
    assetName: string
  ): NodejsFunction {
    return new NodejsFunction(this, lambdaName, {
      runtime: Runtime.NODEJS_20_X,
      handler: "main",
      code: Code.fromAsset(
        path.join(__dirname, `../lambda-functions/${assetName}}`)
      ),
    });
  }
}
