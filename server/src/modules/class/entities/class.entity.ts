import { TableEntity } from 'src/modules/table/entities/table.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  OneToMany,
} from 'typeorm';

@Entity('qlsv_class')
export class ClassEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ default: 28 })
  tableQuantity: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  @Index('created_at')
  createdAt: Date;

  @OneToMany(() => TableEntity, (table) => table.classs)
  tables: TableEntity[];
}
