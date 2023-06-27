import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/config';
import { TableModule } from './table/table.module';
import { AuthModule } from './auth/auth.module';
import { CheckInModule } from './check-in/check-in.module';
import { ClassModule } from './class/class.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({ ...dataSourceOptions, autoLoadEntities: true }),
    TableModule,
    AuthModule,
    CheckInModule,
    ClassModule,
    UserModule,
  ],
})
export class AppModule {}
