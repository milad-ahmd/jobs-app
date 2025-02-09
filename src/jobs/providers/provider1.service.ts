import { Injectable, Logger } from "@nestjs/common";
import axios from "axios";
import { transformProvider1Data } from "../transformers/provider1.transformer";
import { CreateJobDto } from "../dto/create-job.dto";

@Injectable()
export class Provider1Service {
  private readonly logger = new Logger(Provider1Service.name);

  async getJobs(): Promise<CreateJobDto[]> {
    try {
      const { data } = await axios.get(
        "https://assignment.devotel.io/api/provider1/jobs"
      );
      return data.map(transformProvider1Data); // apply transformation
    } catch (err) {
      this.logger.error(`Error fetching data from Provider1: ${err.message}`);
      throw err;
    }
  }
}
