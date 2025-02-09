// test/jobs/jobs.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { JobsService } from '../../src/jobs/jobs.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Job } from '../../src/jobs/entities/job.entity';
import { Repository } from 'typeorm';

describe('JobsService', () => {
  let service: JobsService;
  let repo: Repository<Job>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobsService,
        {
          provide: getRepositoryToken(Job),
          useClass: Repository,
        },
        // If needed, mock Provider1Service, Provider2Service
      ],
    }).compile();

    service = module.get<JobsService>(JobsService);
    repo = module.get<Repository<Job>>(getRepositoryToken(Job));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('upsertJob', () => {
    it('should create a new job if it does not exist', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(null);
      jest.spyOn(repo, 'save').mockResolvedValue({ id: 1 } as Job);

      const result = await (service as any).upsertJob({
        title: 'Test Job',
        description: 'desc',
        location: 'Remote',
        salary: 50000,
        company: 'TestCo',
        postedAt: new Date(),
        externalId: 'xyz',
        providerName: 'provider1',
      });

      expect(result.id).toBe(1);
      expect(repo.save).toHaveBeenCalledTimes(1);
    });

    it('should update an existing job if found', async () => {
      const existing = { id: 2, externalId: 'abc', providerName: 'provider1' } as Job;
      jest.spyOn(repo, 'findOne').mockResolvedValue(existing);
      jest.spyOn(repo, 'save').mockResolvedValue({ ...existing, title: 'Updated Title' });

      const result = await (service as any).upsertJob({
        title: 'Updated Title',
        description: 'desc',
        location: 'Remote',
        salary: 55000,
        company: 'TestCo',
        postedAt: new Date(),
        externalId: 'abc',
        providerName: 'provider1',
      });

      expect(result.title).toBe('Updated Title');
      expect(repo.save).toHaveBeenCalledTimes(1);
    });
  });
});
