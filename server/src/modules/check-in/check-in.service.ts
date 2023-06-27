import { Injectable } from '@nestjs/common';
import { CreateCheckInDto, GetCheckinClassDto } from './dto/create-check-in.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckInEntity } from './entities/check-in.entity';
import { Between, FindOptionsWhere, In, Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { TableService } from '../table/table.service';
import { UserRole } from '../user/enums/user.enum';

@Injectable()
export class CheckInService {
  constructor(
    @InjectRepository(CheckInEntity)
    private readonly checkinRepo: Repository<CheckInEntity>,
    private userService: UserService,
    private tableService: TableService,
  ) {}

  async create(payload: CreateCheckInDto) {
    const endDate = new Date(new Date().setHours(23, 59, 59, 999)),
      startDate = new Date(new Date().setHours(0, 0, 0, 0));

    const { userId, tableId } = payload,
      user = await this.userService.findOneBy({ id: userId }),
      table = await this.tableService.findOneBy({ id: tableId }),
      checkInExist = await this.checkinRepo.findOneBy({ user: { id: userId }, createdAt: Between(startDate, endDate) });
    if (!user) return { state: 0, msg: 'Người dùng không tồn tại!' };
    if (!table) return { state: 0, msg: 'Bàn không tồn tại!' };
    if (user.role !== UserRole.STUDENT) return { state: 0, msg: 'Bạn không phải là học sinh!' };
    if (checkInExist) return { state: 0, msg: 'Bạn đã điểm danh ngày hôm nay rồi!' };
    await this.checkinRepo.save({ user, table });
    await this.tableService.updateState(table.id);
    return {
      state: 1,
      msg: 'Điểm danh thành công!',
    };
  }

  async findAll(className: string) {
    const tables = await this.tableService.findAll({ className });
    return await this.checkinRepo.find({
      where: { table: { id: In(tables.map(({ id }) => id)) } },
      relations: { user: true },
      select: { user: { username: true, fullname: true } },
    });
  }

  async remove(id: number) {
    const checkinExist = await this.checkinRepo.findOne({
      where: { id },
      relations: { table: true },
    });
    await this.tableService.updateState(checkinExist.table.id);
    return await this.checkinRepo.remove(checkinExist);
  }

  async findAllCheckInBy(payload: GetCheckinClassDto) {
    const { classId } = payload;
    try {
      const tables = await this.tableService.findAll({ classId });
      const listCheckin = await this.checkinRepo.find({
        where: { table: { id: In(tables.map(({ id }) => id)) } },
        relations: { user: true },
        select: { createdAt: true, user: { fullname: true, username: true } },
      });
      return { state: 1, listCheckin };
    } catch (error) {
      console.log(error);
      return {
        state: 0,
      };
    }
  }
}
