import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { FilterJobsDto } from './dto/filter-jobs.dto';
import { Job } from './entities/job.entity';
import { ApiTags, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('job-offers')
@Controller('api/job-offers')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the list of job offers',
    type: [Job],
  })
  @ApiQuery({
    name: 'title',
    required: false,
    description: 'Filter job offers by job title',
  })
  @ApiQuery({
    name: 'location',
    required: false,
    description: 'Filter job offers by location',
  })
  @ApiQuery({
    name: 'minSalary',
    required: false,
    description: 'Filter job offers by minimum salary',
  })
  @ApiQuery({
    name: 'maxSalary',
    required: false,
    description: 'Filter job offers by maximum salary',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination (default: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limit number of job offers per page (default: 10)',
  })
  async getJobOffers(
    @Query() filterDto: FilterJobsDto,
  ): Promise<{ data: Job[]; total: number }> {
    // Validation for salary range
    if (
      filterDto.minSalary &&
      filterDto.maxSalary &&
      filterDto.minSalary > filterDto.maxSalary
    ) {
      throw new BadRequestException(
        'minSalary cannot be greater than maxSalary',
      );
    }

    return this.jobsService.getJobOffers(filterDto);
  }
}
