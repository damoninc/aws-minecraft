import { Stack, StackProps } from "aws-cdk-lib";
import { Repository } from "aws-cdk-lib/aws-ecr";
import { Construct } from "constructs";

export class RepoStack extends Stack {
  public repo: Repository;
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);
    this.repo = new Repository(this, "MinecraftRepository");
  }
}
