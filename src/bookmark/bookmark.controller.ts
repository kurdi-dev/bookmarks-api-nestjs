import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JWTGuard } from '../auth/guard/jwt.guard';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@UseGuards(JWTGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Get()
  getBookmarks(@GetUser('id') userId: number) {
    return this.bookmarkService.getBookmarks(userId);
  }

  @Post()
  creatBookmarks(
    @GetUser('id') userId: number,
    @Body() dto: CreateBookmarkDto,
  ) {
    return this.bookmarkService.creatBookmarks(userId, dto);
  }

  @Get('/:id')
  getBookmarkById(
    @Param('id', ParseIntPipe) bookmarkId: number,
    @GetUser('id') userId: number,
  ) {
    return this.bookmarkService.getBookmarkById(bookmarkId, userId);
  }

  @Patch('/:id')
  editBookmarkById(
    @Param('id', ParseIntPipe) bookmarkId: number,
    @GetUser('id') userId: number,
    @Body() dto: EditBookmarkDto,
  ) {
    return this.bookmarkService.editBookmarkById(bookmarkId, userId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  deleteBookmarkById(
    @Param('id', ParseIntPipe) bookmarkId: number,
    @GetUser('id') userId: number,
  ) {
    return this.bookmarkService.deleteBookmarkById(bookmarkId, userId);
  }
}
