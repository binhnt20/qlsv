import { Column, Entity, PrimaryGeneratedColumn, Index, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { UserGender, UserRole } from '../enums/user.enum';
import { CheckInEntity } from 'src/modules/check-in/entities/check-in.entity';
import { TableEntity } from 'src/modules/table/entities/table.entity';

@Entity('qlsv_user')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true })
  fullname: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ default: UserGender.UNKNOWN, type: 'varchar' })
  gender: UserGender;

  @Column({ nullable: true })
  birthday: Date;

  @Column({ default: UserRole.STUDENT, type: 'varchar' })
  role: UserRole;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  @Index('created_at')
  createdAt: Date;

  @OneToMany(() => CheckInEntity, (checkIn) => checkIn.user)
  checkIn: CheckInEntity[];

  // @OneToOne(() => TableEntity, (table) => table.user)
  // table: TableEntity;
}
