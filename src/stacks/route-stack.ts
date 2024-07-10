import { Fn, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { ARecord, HostedZone, RecordTarget } from "aws-cdk-lib/aws-route53";
import {
  ApiGateway,
  LoadBalancerTarget,
} from "aws-cdk-lib/aws-route53-targets";
import { RestApi } from "aws-cdk-lib/aws-apigateway";
import { NetworkLoadBalancer } from "aws-cdk-lib/aws-elasticloadbalancingv2";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

interface RouteProps extends StackProps {
  loadBalancer: NetworkLoadBalancer;
}
export class RouteStack extends Stack {
  constructor(scope: Construct, id: string, props: RouteProps) {
    super(scope, id, props);

    const hostedZone = new HostedZone(this, "MinecraftHostedZone", {
      zoneName: "damonincorvaia.com",
    });

    new ARecord(this, "MinecraftARecord", {
      zone: hostedZone,
      recordName: "craft",
      target: RecordTarget.fromAlias(
        new LoadBalancerTarget(props.loadBalancer)
      ),
    });
  }
}
