import { CreateJobDto } from '../dto/create-job.dto';

export function transformProvider1Data(item: any): CreateJobDto {
  return {
    title: item.position_title,
    description: item.position_description,
    location: item.job_location,
    salary: item.pay,
    company: item.company_name,
    postedAt: new Date(item.posted_date),
    externalId: item.id,
    providerName: 'provider1',
  };
}
