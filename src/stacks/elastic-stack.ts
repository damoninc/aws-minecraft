import { CfnOutput, Duration, Stack, StackProps } from "aws-cdk-lib";
import { Peer, Port, SecurityGroup, Vpc } from "aws-cdk-lib/aws-ec2";
import {
  Cluster,
  FargateTaskDefinition,
  ContainerImage,
  LogDrivers,
  FargateService,
} from "aws-cdk-lib/aws-ecs";
import { Construct } from "constructs";
import { NetworkLoadBalancer } from "aws-cdk-lib/aws-elasticloadbalancingv2";
import { Repository } from "aws-cdk-lib/aws-ecr";

interface ElasticProps extends StackProps {
  repository: Repository;
  vpc: Vpc;
  cluster: Cluster;
}

export class ElasticStack extends Stack {
  public loadBalancerObj: NetworkLoadBalancer;
  constructor(scope: Construct, id: string, props: ElasticProps) {
    super(scope, id, props);

    const taskDefinition = new FargateTaskDefinition(
      this,
      "MinecraftTaskDefinition",
      {
        memoryLimitMiB: 4096,
        cpu: 1024,
      }
    );
    const container = taskDefinition.addContainer("MinecraftContainer", {
      image: ContainerImage.fromEcrRepository(props.repository),
      memoryLimitMiB: 4096,
      cpu: 1024,
      logging: LogDrivers.awsLogs({ streamPrefix: "MinecraftServer" }),
    });

    container.addPortMappings({ containerPort: 25565 });

    const securityGroup = new SecurityGroup(this, "MinecraftSecurityGroup", {
      vpc: props.vpc,
      allowAllOutbound: true,
    });

    securityGroup.addIngressRule(Peer.anyIpv4(), Port.tcp(25565));

    const service = new FargateService(this, "MinecraftService", {
      cluster: props.cluster,
      taskDefinition: taskDefinition,
      desiredCount: 1,
      assignPublicIp: true,
      securityGroups: [securityGroup],
    });

    const loadBalancer = new NetworkLoadBalancer(this, "MinecraftNLB", {
      vpc: props.vpc,
      internetFacing: true,
    });

    const listener = loadBalancer.addListener("Listener", {
      port: 25565,
    });

    listener.addTargets("MinecraftFargateService", {
      port: 25565,
      targets: [service],
      healthCheck: {
        interval: Duration.seconds(60),
        port: "25565",
        timeout: Duration.seconds(5),
        healthyThresholdCount: 2,
        unhealthyThresholdCount: 2,
      },
    });

    this.loadBalancerObj = loadBalancer;
    new CfnOutput(this, "LoadBalancerDNS", {
      value: loadBalancer.loadBalancerDnsName,
    });
  }
}
