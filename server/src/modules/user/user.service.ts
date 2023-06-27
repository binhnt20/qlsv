import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserRole } from './enums/user.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async create(payload: CreateUserDto) {
    let { username, password, role = UserRole.STUDENT } = payload;
    const exist = await this.userRepo.findOneBy({
      username,
    });
    if (exist) throw new BadRequestException('username already exist');

    const hashedPassword = await bcrypt.hash(password, 10);
    password = hashedPassword;

    return this.userRepo.save({ ...payload, role, password }).then((res) => ({
      statusCode: HttpStatus.CREATED,
      message: 'Register success',
    }));
  }

  async findByName(username: string): Promise<UserEntity> {
    const exist = await this.userRepo.findOneBy({ username });
    if (!exist) {
      throw new NotFoundException('User not found.');
    }
    return exist;
  }

  async findOneBy(payload: FindOptionsWhere<UserEntity>): Promise<UserEntity> {
    const exist = await this.userRepo.findOneBy(payload);
    if (!exist) {
      throw new NotFoundException('User not found.');
    }
    return exist;
  }

  async getDetailUser(payload: FindOptionsWhere<UserEntity>): Promise<Partial<UserEntity>> {
    const exist = await this.userRepo.findOne({
      where: payload,
      select: ['birthday', 'fullname', 'username', 'role', 'birthday', 'gender'],
    });
    if (!exist) {
      throw new NotFoundException('User not found.');
    }
    return exist;
  }
}
