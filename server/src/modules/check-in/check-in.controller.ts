import { Controller, Post, Body, Param, Delete, UseGuards, Get, Query } from '@nestjs/common';
import { CheckInService } from './check-in.service';
import { CreateCheckInDto, GetCheckinClassDto } from './dto/create-check-in.dto';
import { ApiTags } from '@nestjs/swagger';
import { HeaderAuthGuard } from '../auth/auth.guard';

@ApiTags('Check in')
@UseGuards(HeaderAuthGuard)
@Controller('check-in')
export class CheckInController {
  constructor(private readonly checkInService: CheckInService) {}

  @Post()
  create(@Body() createCheckInDto: CreateCheckInDto) {
    return this.checkInService.create(createCheckInDto);
  }

  @Get()
  getAllCheckin(@Query() query: GetCheckinClassDto) {
    return this.checkInService.findAllCheckInBy(query);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkInService.remove(+id);
  }
}
