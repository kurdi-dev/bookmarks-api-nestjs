import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';

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
    prisma = app.get(PrismaService);
    await prisma.cleanDb();
  });
  afterAll(() => app.close());

  describe('Auth', () => {
    describe('Sign Up', () => {
      it.todo('Should signup');
    });
    describe('Sign In', () => {
      it.todo('Should signin');
    });
  });
  describe('User', () => {
    describe('Get me', () => {
      it.todo('Should get user');
    });
    describe('Edit User', () => {
      it.todo('Should edit user');
    });
  });
  describe('Bookmark', () => {
    describe('Get Bookmarks', () => {
      it.todo('Should get all bookmarks for the user');
    });
    describe('Get Single Bookmark by Id', () => {
      it.todo('Should get a bookmark by Id');
    });
    describe('Create Single Bookmark', () => {
      it.todo('Should create a bookmark');
    });
    describe('Update Single Bookmark', () => {
      it.todo('Should update a bookmark by id');
    });
    describe('Delete Single Bookmark', () => {
      it.todo('Should delete a bookmark by Id');
    });
  });
});
