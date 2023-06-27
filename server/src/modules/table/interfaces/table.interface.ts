import { TableEntity } from '../entities/table.entity';

export interface ITableReturn extends TableEntity {
  username?: string;
  fullname?: string;
}
