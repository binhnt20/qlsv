import { CheckInEntity } from 'src/modules/check-in/entities/check-in.entity';
import { ClassEntity } from 'src/modules/class/entities/class.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Column, Entity, PrimaryGeneratedColumn, Index, OneToMany, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

@Entity('qlsv_table')
export class TableEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ default: false })
  state: Boolean;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  @Index('created_at')
  createdAt: Date;

  @OneToMany(() => CheckInEntity, (checkIn) => checkIn.user)
  checkIn: CheckInEntity[];

  @ManyToOne(() => ClassEntity, (classs) => classs.tables)
  classs: ClassEntity;

  // @OneToOne(() => UserEntity, (user) => user.table)
  // @JoinColumn()
  // user: UserEntity;
}
