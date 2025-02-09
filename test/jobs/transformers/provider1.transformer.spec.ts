// test/jobs/transformers/provider1.transformer.spec.ts
import { transformProvider1Data } from '../../../src/jobs/transformers/provider1.transformer';
import { CreateJobDto } from '../../../src/jobs/dto/create-job.dto';

describe('Provider1 Transformer', () => {
  it('should transform provider1 data to CreateJobDto', () => {
    const mockData = {
      position_title: 'Backend Engineer',
      position_description: 'Some description',
      job_location: 'Remote',
      pay: 60000,
      company_name: 'TechCorp',
      posted_date: '2025-01-01T12:00:00Z',
      id: '1234',
    };
    const result: CreateJobDto = transformProvider1Data(mockData);
    expect(result.title).toBe('Backend Engineer');
    expect(result.providerName).toBe('provider1');
    expect(result.externalId).toBe('1234');
  });
});
