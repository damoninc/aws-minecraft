import { EC2Client } from "@aws-sdk/client-ec2";

export class AEC2Handler {
  public ec2client: EC2Client;
  constructor() {
    this.ec2client = new EC2Client();
  }
}
