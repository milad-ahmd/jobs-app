import { CreateJobDto } from '../dto/create-job.dto';

export function transformProvider2Data(item: any): CreateJobDto {
  return {
    title: item.title,
    description: item.desc,
    location: item.city,
    salary: item.compensation,
    company: item.org,
    postedAt: new Date(item.createdAt),
    externalId: item.uuid,
    providerName: 'provider2',
  };
}
