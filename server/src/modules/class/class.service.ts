import { Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassEntity } from './entities/class.entity';
import { Repository, FindOptionsWhere } from 'typeorm';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(ClassEntity)
    private readonly classRepo: Repository<ClassEntity>,
  ) {}

  async getAll() {
    return await this.classRepo.find({select:['id','name']});
  }

  async create(createClassDto: CreateClassDto) {
    return await this.classRepo.save(createClassDto);
  }

  async findOneBy(payload: FindOptionsWhere<ClassEntity>) {
    return await this.classRepo.findOneBy(payload);
  }
}
