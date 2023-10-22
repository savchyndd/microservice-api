import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from '../src/reviews/dto/create-review.dto';
import { Types, disconnect } from 'mongoose';
import { REVIEW_NOT_FOUND } from '../src/reviews/reviews.constants';
import { AuthDto } from 'src/auth/dto/auth.dto';

const productId = new Types.ObjectId().toHexString();

const loginDto: AuthDto = {
  login: 'example@gmail.com',
  password: 'examplE1',
};

const testDto: CreateReviewDto = {
  name: 'Test',
  title: 'Title1',
  description: 'Description',
  rating: 5,
  productId,
};

describe('ReviewsController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const { body } = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto);
    token = body.access_token;
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

  it('/reviews/create (POST) - fail', async (done) => {
    return request(app.getHttpServer())
      .post('/reviews/create')
      .send({ ...testDto, rating: 0 })
      .expect(400)
      .then(({ body }: request.Response) => {
        console.log('/reviews/aceert(POST) - fail', body);

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
      .set('Authorization', 'Bearer ' + token)
      .expect(200);
  });

  it('/reviews/:id (DELETE) - fail', () => {
    return request(app.getHttpServer())
      .delete('/reviews/' + new Types.ObjectId().toHexString())
      .set('Authorization', 'Bearer ' + token)
      .expect(404, {
        statusCode: 404,
        message: REVIEW_NOT_FOUND,
      });
  });

  afterAll(() => {
    disconnect();
  });
});
