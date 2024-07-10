import { Stack, StackProps } from "aws-cdk-lib";
import { Vpc } from "aws-cdk-lib/aws-ec2";
import { Cluster } from "aws-cdk-lib/aws-ecs";
import { Construct } from "constructs";

interface ClusterProps extends StackProps {
  vpc: Vpc;
}

export class ClusterStack extends Stack {
  public cluster: Cluster;
  constructor(scope: Construct, id: string, props: ClusterProps) {
    super(scope, id, props);
    this.cluster = new Cluster(this, "MinecraftRepository", { vpc: props.vpc });
  }
}
