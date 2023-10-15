import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from '../src/reviews/dto/create-review.dto';
import { Types, disconnect } from 'mongoose';
import { REVIEW_NOT_FOUND } from '../src/reviews/reviews.constants';

const productId = new Types.ObjectId().toHexString();
const testDto: CreateReviewDto = {
  name: 'Test',
  title: 'Title1',
  description: 'Description',
  rating: 5,
  productId,
};

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/reviews/create (POST)', async (done) => {
    return request(app.getHttpServer())
      .post('/reviews/create')
      .send(testDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        createdId = body._id;
        expect(createdId).toBeDefined();
        done();
      });
  });

  it('/reviews/byProduct/:productId (GET)', async (done) => {
    return request(app.getHttpServer())
      .get('/reviews/byProduct/' + productId)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(1);
        done();
      });
  });

  it('/reviews/byProduct/:productId (GET) - fail', async (done) => {
    return request(app.getHttpServer())
      .get('/reviews/byProduct/' + new Types.ObjectId().toHexString())
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(0);
        done();
      });
  });

  it('/reviews/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/reviews/' + createdId)
      .expect(200);
  });

  it('/reviews/:id (DELETE) - fail', () => {
    return request(app.getHttpServer())
      .delete('/reviews/' + new Types.ObjectId().toHexString())
      .expect(404, {
        statusCode: 404,
        message: REVIEW_NOT_FOUND,
      });
  });

  afterAll(() => {
    disconnect();
  });
});
