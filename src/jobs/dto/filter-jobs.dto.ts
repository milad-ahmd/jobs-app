// src/jobs/dto/filter-jobs.dto.ts

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, Min, Max } from 'class-validator';

export class FilterJobsDto {
  @ApiPropertyOptional({ description: 'Filter by job title' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: 'Filter by location' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({ description: 'Filter by minimum salary' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minSalary?: number;

  @ApiPropertyOptional({ description: 'Filter by maximum salary' })
  @IsOptional()
  @IsNumber()
  @Max(1000000)
  maxSalary?: number;

  @ApiPropertyOptional({ description: 'Page number for pagination' })
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ description: 'Limit number of results per page' })
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number;
}
