import { EC2Client } from "@aws-sdk/client-ec2";
import * as cdk from "aws-cdk-lib";
import { AEC2Handler } from "../lambda-shared/ec2-handler";
export class Handler extends AEC2Handler {
  public main(event: any) {}
}

const handler = new Handler();

export const main = handler.main.bind(handler);
