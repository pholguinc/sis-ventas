import { INestApplication } from '@nestjs/common';
import { AuthService } from '../../src/auth/services/auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import request from 'supertest';
import { expect } from 'chai';

describe('User APIs (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AuthService)
      .useValue({ validate: () => true })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/auth/login (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get('/auth/login')
      .set({ Authorization: 'TOKEN' });
    expect(res.status).equal(200);
  });
});
