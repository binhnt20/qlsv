import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { ApiTags } from '@nestjs/swagger';
import { HeaderAuthGuard } from '../auth/auth.guard';

@ApiTags('Class')
@UseGuards(HeaderAuthGuard)
@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Get()
  getAll() {
    return this.classService.getAll();
  }

  @Post()
  create(@Body() createClassDto: CreateClassDto) {
    return this.classService.create(createClassDto);
  }

  @Get(':id')
  getDetail(@Param('id') id: string) {
    return this.classService.findOneBy({ id: +id });
  }
}
