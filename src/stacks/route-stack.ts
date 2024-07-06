import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { ARecord, HostedZone, RecordTarget } from "aws-cdk-lib/aws-route53";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class RouteStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const hostedZone = new HostedZone(this, "MinecraftHostedZone", {
      zoneName: "damonincorvaia.com",
    });

    new ARecord(this, "MinecraftARecord", {
      zone: hostedZone,
      recordName: "craft",
      target: RecordTarget.fromIpAddresses("1.2.3.4"),
    });
  }
}
