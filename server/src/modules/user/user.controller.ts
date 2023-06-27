import { Controller, Post, Body, UseGuards, Query, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { HeaderAuthGuard } from '../auth/auth.guard';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(HeaderAuthGuard)
  @Get()
  userInfo(@Query() query) {
    const { userId } = query;
    if (!userId) return { state: 0 };
    return this.userService.getDetailUser({ id: +userId });
  }
}
