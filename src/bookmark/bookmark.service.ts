import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  async getBookmarks(userId: number) {
    return this.prisma.bookmark.findMany({
      where: { userId: userId },
    });
  }

  async creatBookmarks(userId: number, dto: CreateBookmarkDto) {
    const bookmark = await this.prisma.bookmark.create({
      data: { userId, ...dto },
    });
    delete bookmark.userId;
    return bookmark;
  }

  async getBookmarkById(bookmarkId: number, userId: number) {
    const bookmark = await this.prisma.bookmark.findFirst({
      where: { id: bookmarkId, userId: userId },
    });
    if (!bookmark) {
      return null;
    }
    delete bookmark.userId;
    return bookmark;
  }

  async editBookmarkById(
    bookmarkId: number,
    userId: number,
    dto: EditBookmarkDto,
  ) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: { id: bookmarkId },
    });
    if (!bookmark || bookmark.userId !== userId) {
      throw new ForbiddenException('Not allowed!');
    }
    const updatedBookmark = await this.prisma.bookmark.update({
      where: { id: bookmarkId },
      data: { ...dto },
    });
    delete updatedBookmark.userId;
    return updatedBookmark;
  }

  async deleteBookmarkById(bookmarkId: number, userId: number) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: { id: bookmarkId },
    });
    if (!bookmark || bookmark.userId !== userId) {
      throw new ForbiddenException('Not allowed!');
    }
    await this.prisma.bookmark.delete({ where: { id: bookmarkId } });
  }
}
