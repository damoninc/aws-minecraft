#!/usr/bin/env node
import "source-map-support/register";
import { App } from "aws-cdk-lib";
import { ElasticStack } from "../src/stacks/elastic-stack";
import { RepoStack } from "../src/stacks/repo-stack";
import { VpcStack } from "../src/stacks/vpc-stack";
import { ClusterStack } from "../src/stacks/cluster-stack";

const app = new App();

const repositoryStack = new RepoStack(app, "RepoStack", {});

const vpcStack = new VpcStack(app, "VpcStack", {});

const clusterStack = new ClusterStack(app, "ClusterStack", {
  vpc: vpcStack.vpc,
});

const elasticStack = new ElasticStack(app, "ElasticStack", {
  repository: repositoryStack.repo,
  vpc: vpcStack.vpc,
  cluster: clusterStack.cluster,
});
