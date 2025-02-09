import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsDate } from 'class-validator';

export class CreateJobDto {
  @ApiProperty({ description: 'The title of the job offer' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'The description of the job' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'The location of the job' })
  @IsString()
  location: string;

  @ApiProperty({ description: 'The salary for the job' })
  @IsNumber()
  salary: number;

  @ApiProperty({ description: 'The company offering the job' })
  @IsString()
  company: string;

  @ApiProperty({ description: 'The posting date of the job' })
  @IsDate()
  postedAt: Date;

  @ApiProperty({ description: 'The unique external ID from the provider' })
  @IsString()
  externalId: string;

  @ApiProperty({ description: 'The provider of the job' })
  @IsString()
  providerName: string;
}
