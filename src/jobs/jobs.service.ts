import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';
import { Provider1Service } from './providers/provider1.service';
import { Provider2Service } from './providers/provider2.service';
import { CreateJobDto } from './dto/create-job.dto';
import { FilterJobsDto } from './dto/filter-jobs.dto';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class JobsService {
  private readonly logger = new Logger(JobsService.name);

  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
    private readonly provider1Service: Provider1Service,
    private readonly provider2Service: Provider2Service,
  ) {}

  /**
   * Fetch jobs from providers and upsert them into the DB.
   */
  async fetchAndStoreJobs(): Promise<void> {
    const [provider1Jobs, provider2Jobs] = await Promise.all([
      this.provider1Service.getJobs(),
      this.provider2Service.getJobs(),
    ]);

    const allJobs = [...provider1Jobs, ...provider2Jobs];
    this.logger.log(`Fetched ${allJobs.length} jobs from both providers.`);

    for (const jobDto of allJobs) {
      try {
        await this.upsertJob(jobDto);
      } catch (err) {
        this.logger.error(
          `Failed to upsert job ${jobDto.externalId} (${jobDto.providerName}): ${err.message}`,
        );
      }
    }
  }

  /**
   * Upsert a job using (externalId, providerName) as the unique key
   */
  private async upsertJob(createJobDto: CreateJobDto): Promise<Job> {
    let job = await this.jobRepository.findOne({
      where: {
        externalId: createJobDto.externalId,
        providerName: createJobDto.providerName,
      },
    });

    if (job) {
      job = { ...job, ...createJobDto };
      return this.jobRepository.save(job);
    } else {
      const newJob = this.jobRepository.create(createJobDto);
      return this.jobRepository.save(newJob);
    }
  }

  /**
   * Get job offers with filters and pagination
   */
  async getJobOffers(
    filterDto: FilterJobsDto,
  ): Promise<{ data: Job[]; total: number }> {
    const {
      title,
      location,
      minSalary,
      maxSalary,
      page = 1,
      limit = 10,
    } = filterDto;

    if (minSalary && maxSalary && minSalary > maxSalary) {
      throw new BadRequestException(
        'minSalary cannot be greater than maxSalary.',
      );
    }

    const query = this.jobRepository.createQueryBuilder('job');

    if (title) {
      query.andWhere('job.title ILIKE :title', { title: `%${title}%` });
    }
    if (location) {
      query.andWhere('job.location ILIKE :location', {
        location: `%${location}%`,
      });
    }
    if (minSalary !== undefined) {
      query.andWhere('job.salary >= :minSalary', { minSalary });
    }
    if (maxSalary !== undefined) {
      query.andWhere('job.salary <= :maxSalary', { maxSalary });
    }

    // Pagination
    const [jobs, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { data: jobs, total };
  }

  // Schedule the job to run every hour
  @Cron(CronExpression.EVERY_HOUR)
  handleCron() {
    this.fetchAndStoreJobs().catch((err) => {
      this.logger.error(`Cron job failed: ${err.message}`);
    });
  }
}
