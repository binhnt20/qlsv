import { Injectable } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TableEntity } from './entities/table.entity';
import { Repository, FindOptionsWhere, Between } from 'typeorm';
import { ClassService } from '../class/class.service';
import { CheckInEntity } from '../check-in/entities/check-in.entity';
import { ITableReturn } from './interfaces/table.interface';

@Injectable()
export class TableService {
  constructor(
    @InjectRepository(TableEntity)
    private readonly tableRepo: Repository<TableEntity>,
    private readonly classService: ClassService,
    @InjectRepository(CheckInEntity)
    private readonly checkinRepo: Repository<CheckInEntity>,
  ) {}

  async create(payload: CreateTableDto) {
    const classExist = await this.classService.findOneBy({
        name: payload.className,
      }),
      newTable = new TableEntity();
    return await this.tableRepo.save({ ...newTable, classs: classExist });
  }

  async findAll(payload: CreateTableDto) {
    const listTable = await this.tableRepo.find({
      where: { classs: { id: payload.classId } },
      // relations: { user: true },
      // select: { user: { fullname: true, username: true } },
      order: { createdAt: 'ASC' },
    });
    const listTableWithUser: ITableReturn[] = [];
    for (const item of listTable) {
      const endDate = new Date(new Date().setHours(23, 59, 59, 999)),
        startDate = new Date(new Date().setHours(0, 0, 0, 0));

      const { id } = item,
        checkinDetail = await this.checkinRepo.findOne({
          where: { table: { id }, createdAt: Between(startDate, endDate) },
          relations: { user: true },
          select: { user: { username: true, fullname: true } },
        });
      if (!checkinDetail) {
        listTableWithUser.push(item);
        continue;
      }
      const { user } = checkinDetail,
        { username, fullname } = user;
      listTableWithUser.push({ ...item, username, fullname });
    }

    return listTableWithUser;
  }

  async findOneBy(payload: FindOptionsWhere<TableEntity>) {
    return await this.tableRepo.findOneBy(payload);
  }

  async updateState(id: number, payload: Partial<TableEntity> = {}) {
    const tableExist = await this.tableRepo.findOneBy({ id });
    // if (tableExist.state) payload = { user: null };
    return await this.tableRepo.save({
      ...tableExist,
      state: !tableExist.state,
      ...payload,
    });
  }
}
