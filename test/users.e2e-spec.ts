import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';

describe('UsersController (e2e)', () => {
    let app: INestApplication;
    let userToken: string;
    let userId: number;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('/users (POST)', () => {
        return request(app.getHttpServer())
            .post('/users')
            .send({ email: 'test@example.com', password: 'password' })
            .expect(201)
            .then(response => {
                userId = response.body.id;
            });
    });

    it('/users (GET)', () => {
        return request(app.getHttpServer())
            .get('/users')
            .expect(200)
            .then(response => {
                expect(response.body).toBeInstanceOf(Array);
            });
    });

    it('/users/:id (GET)', () => {
        return request(app.getHttpServer())
            .get(`/users/${userId}`)
            .expect(200)
            .then(response => {
                expect(response.body).toHaveProperty('email', 'test@example.com');
            });
    });

    it('/users/:id (PATCH)', () => {
        return request(app.getHttpServer())
            .patch(`/users/${userId}`)
            .send({ email: 'testupdated@example.com' })
            .expect(200)
            .then(response => {
                expect(response.body).toHaveProperty('email', 'testupdated@example.com');
            });
    });

    it('/users/:id (DELETE)', () => {
        return request(app.getHttpServer())
            .delete(`/users/${userId}`)
            .expect(200);
    });
});
