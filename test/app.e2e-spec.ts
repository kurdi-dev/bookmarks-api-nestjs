import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { AuthDto } from '../src/auth/dto';
import { UserDto } from '../src/user/dto';
import { CreateBookmarkDto, EditBookmarkDto } from '../src/bookmark/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3333);
    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3333');
  });
  afterAll(() => app.close());

  describe('Auth =>', () => {
    const dto: AuthDto = { email: 'walid@gmail.com', password: '123456' };
    describe('Sign up:', () => {
      it('should throw 400 when email is empity', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto.password)
          .expectStatus(400);
      });
      it('should throw 400 when password is empity', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto.email)
          .expectStatus(400);
      });
      it('should throw 400 when email param is not email', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ email: 'not@email', password: dto.password })
          .expectStatus(400);
      });
      it('should throw 400 when no body provided', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400);
      });
      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
    });
    describe('Sign in:', () => {
      it('should throw 400 when email is empity', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto.password)
          .expectStatus(400);
      });
      it('should throw 400 when password is empity', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto.email)
          .expectStatus(400);
      });
      it('should throw 400 when email param is not email', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ email: 'not@email', password: dto.password })
          .expectStatus(400);
      });
      it('should throw 400 when no body provided', () => {
        return pactum.spec().post('/auth/signin').expectStatus(400);
      });
      it('should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'access_token');
      });
    });
  });
  describe('User =>', () => {
    describe('Get me:', () => {
      it('should get signed in user data', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(200);
      });
    });
    describe('Edit user:', () => {
      const dto: UserDto = { firstName: 'Walid', lastName: 'Rashed' };
      it('Should edit user', () => {
        return pactum
          .spec()
          .patch('/users/edit')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.firstName)
          .expectBodyContains(dto.lastName);
      });
    });
  });
  describe('Bookmark =>', () => {
    describe('Get empity bookmarks:', () => {
      it('should get empity bookmarks initially', () => {
        return pactum
          .spec()
          .get('/bookmarks')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(200)
          .expectBody([]);
      });
    });
    describe('Create single bookmark:', () => {
      const dto: CreateBookmarkDto = {
        title: 'Kurdi-Dev website',
        link: 'https://kurdi.dev',
      };

      it('should create a bookmark', () => {
        return pactum
          .spec()
          .post('/bookmarks')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withBody(dto)
          .expectStatus(201);
      });
    });
    describe('Get created bookmark:', () => {
      it('should get 1 bookmark', () => {
        return pactum
          .spec()
          .get('/bookmarks')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(200)
          .expectJsonLength(1)
          .stores('bookmarkId', 'id');
      });
    });
    describe('Get single bookmark by Id:', () => {
      it('should get a bookmark by Id', () => {
        return pactum
          .spec()
          .get('/bookmarks/$S{bookmarkId}')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(200);
      });
    });

    describe('Update single Bookmark:', () => {
      const editDto: EditBookmarkDto = {
        description: 'My amazing website :)',
      };
      it('should update a bookmark by id', () => {
        return pactum
          .spec()
          .patch('/bookmarks/$S{bookmarkId}')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withBody(editDto)
          .expectStatus(200);
      });
    });
    describe('Delete single bookmark:', () => {
      it('should delete a bookmark by Id', () => {
        return pactum
          .spec()
          .delete('/bookmarks/$S{bookmarkId}')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(204);
      });
      it('should get empity bookmarks', () => {
        return pactum
          .spec()
          .get('/bookmarks')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(200)
          .expectJsonLength(0)
          .inspect();
      });
    });
  });
});
