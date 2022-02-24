import { Controller, Get, Req, UseGuards } from '@nestjs/common';

import { Request } from 'express';
import { JWTGuard } from 'src/auth/guard';

@UseGuards(JWTGuard)
@Controller('users')
export class UserController {
  @Get('me')
  getMe(@Req() req: Request) {
    return req.user;
  }
}
