import {
  BeforeCreate,
  Column,
  CreatedAt,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { v4 as uuid } from 'uuid';

import Progress from './Progress';

export interface ICreateObjectiveDTO {
  title: string;
  goal: string;
  time?: number;
  isDaily: boolean;
}

@Table
export default class Objective extends Model<Objective, ICreateObjectiveDTO> {
  @PrimaryKey
  @Column(DataType.UUID)
  id: string;

  @Column
  title: string;

  @Column
  goal: string;

  @Column
  time?: number;

  @Column
  isDaily: boolean;

  @HasMany(() => Progress)
  progress?: Progress[];

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BeforeCreate
  static generateId(instance: Objective) {
    instance.id = uuid();
  }
}
