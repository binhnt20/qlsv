import { Module } from '@nestjs/common';
import { TableService } from './table.service';
import { TableController } from './table.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableEntity } from './entities/table.entity';
import { ClassModule } from '../class/class.module';
import { CheckInEntity } from '../check-in/entities/check-in.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TableEntity, CheckInEntity]), ClassModule],
  controllers: [TableController],
  providers: [TableService],
  exports: [TableService],
})
export class TableModule {}
