// test/app.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppModule (E2E)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/job-offers (GET)', async () => {
    const { status, body } = await request(app.getHttpServer()).get('/api/job-offers');
    expect(status).toBe(200);
    expect(Array.isArray(body.data)).toBe(true);
    // Additional checks...
  });

  afterAll(async () => {
    await app.close();
  });
});
