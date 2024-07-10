import { Stack, StackProps } from "aws-cdk-lib";
import { Vpc } from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";

export class VpcStack extends Stack {
  public vpc: Vpc;
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);
    this.vpc = new Vpc(this, "MinecraftVPC", { maxAzs: 2 });
  }
}
