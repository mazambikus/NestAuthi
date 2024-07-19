import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';

describe('PostsController (e2e)', () => {
    let app: INestApplication;
    let postId: number;

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

    it('/posts (POST)', () => {
        return request(app.getHttpServer())
            .post('/posts')
            .send({ title: 'Test Post', content: 'This is a test post.' })
            .expect(201)
            .then(response => {
                postId = response.body.id;
            });
    });

    it('/posts (GET)', () => {
        return request(app.getHttpServer())
            .get('/posts')
            .expect(200)
            .then(response => {
                expect(response.body).toBeInstanceOf(Array);
            });
    });

    it('/posts/:id (GET)', () => {
        return request(app.getHttpServer())
            .get(`/posts/${postId}`)
            .expect(200)
            .then(response => {
                expect(response.body).toHaveProperty('title', 'Test Post');
            });
    });

    it('/posts/:id (PATCH)', () => {
        return request(app.getHttpServer())
            .patch(`/posts/${postId}`)
            .send({ title: 'Updated Test Post' })
            .expect(200)
            .then(response => {
                expect(response.body).toHaveProperty('title', 'Updated Test Post');
            });
    });

    it('/posts/:id (DELETE)', () => {
        return request(app.getHttpServer())
            .delete(`/posts/${postId}`)
            .expect(200);
    });
});
