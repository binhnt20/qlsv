import { UserEntity } from 'src/modules/user/entities/user.entity';
import { TableEntity } from 'src/modules/table/entities/table.entity';
import { Column, Entity, PrimaryGeneratedColumn, Index, ManyToOne, JoinColumn } from 'typeorm';

@Entity('qlsv_checkin')
export class CheckInEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  dateCheckIn: Date;

  @ManyToOne(() => UserEntity, (user) => user.checkIn)
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => TableEntity, (table) => table.checkIn)
  table: TableEntity;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  @Index('created_at')
  createdAt: Date;
}
