// test/jobs/jobs.service.int-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { JobsService } from '../../src/jobs/jobs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from '../../src/jobs/entities/job.entity';
import { Provider1Service } from '../../src/jobs/providers/provider1.service';
import { Provider2Service } from '../../src/jobs/providers/provider2.service';
import { typeOrmConfig } from '../../ormconfig';

describe('JobsService (Integration)', () => {
  let service: JobsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          ...typeOrmConfig,
          database: process.env.DB_DATABASE_TEST, // or an in-memory DB
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Job]),
      ],
      providers: [JobsService, Provider1Service, Provider2Service],
    }).compile();

    service = module.get<JobsService>(JobsService);
  });

  it('fetchAndStoreJobs should upsert jobs from both providers', async () => {
    // If you mock the providers, you can control the data. Otherwise, they'll call the real APIs.
    await service.fetchAndStoreJobs();
    // Then check the database for expected results
  });
});
