import { Module } from '@nestjs/common';
import { CheckInService } from './check-in.service';
import { CheckInController } from './check-in.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckInEntity } from './entities/check-in.entity';
import { UserModule } from '../user/user.module';
import { TableModule } from '../table/table.module';

@Module({
  imports: [TypeOrmModule.forFeature([CheckInEntity]), UserModule, TableModule],
  controllers: [CheckInController],
  providers: [CheckInService],
})
export class CheckInModule {}
