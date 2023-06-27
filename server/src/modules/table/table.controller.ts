import { Controller, Get, Post, Body, Put, Param, Query, UseGuards } from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDto } from './dto/create-table.dto';
import { ApiTags } from '@nestjs/swagger';
import { HeaderAuthGuard } from '../auth/auth.guard';

@ApiTags('Tables')
@UseGuards(HeaderAuthGuard)
@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Post()
  create(@Body() createTableDto: CreateTableDto) {
    return this.tableService.create(createTableDto);
  }

  @Get()
  findAll(@Query() query: CreateTableDto) {
    return this.tableService.findAll(query);
  }

  @Put(':id')
  updateState(@Param('id') id: string) {
    return this.tableService.updateState(+id);
  }
}
