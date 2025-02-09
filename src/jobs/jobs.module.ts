// src/jobs/jobs.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { Job } from './entities/job.entity';
import { Provider1Service } from './providers/provider1.service';
import { Provider2Service } from './providers/provider2.service';

@Module({
  imports: [TypeOrmModule.forFeature([Job])],
  controllers: [JobsController],
  providers: [JobsService, Provider1Service, Provider2Service],
  exports: [JobsService],
})
export class JobsModule {}
