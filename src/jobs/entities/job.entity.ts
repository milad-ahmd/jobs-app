// src/jobs/entities/job.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('jobs')
@Index(['externalId', 'providerName'], { unique: true }) 
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  location: string;

  @Column('decimal')
  salary: number;

  @Column()
  company: string;

  @Column({ type: 'timestamp' })
  postedAt: Date;

  @Column()
  externalId: string;

  @Column()
  providerName: string;
}
