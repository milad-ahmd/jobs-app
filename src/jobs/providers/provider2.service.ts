// src/jobs/providers/provider2.service.ts
import { Injectable, Logger } from "@nestjs/common";
import axios from "axios";
import { transformProvider2Data } from "../transformers/provider2.transformer";
import { CreateJobDto } from "../dto/create-job.dto";

@Injectable()
export class Provider2Service {
  private readonly logger = new Logger(Provider2Service.name);

  async getJobs(): Promise<CreateJobDto[]> {
    try {
      const { data } = await axios.get(
        "https://assignment.devotel.io/api/provider2/jobs"
      );
      return data.map(transformProvider2Data);
    } catch (err) {
      this.logger.error(`Error fetching data from Provider2: ${err.message}`);
      throw err;
    }
  }
}
