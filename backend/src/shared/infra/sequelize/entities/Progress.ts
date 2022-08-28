import {
  BeforeCreate,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { v4 as uuid } from 'uuid';

import Objective from './Objective';
import User from './User';

export interface ICreateProgressDTO {
  userId: string;
  objectiveId: string;
  progress: number;
}

@Table
export default class Progress extends Model<Progress, ICreateProgressDTO> {
  @PrimaryKey
  @Column(DataType.UUID)
  id: string;

  @ForeignKey(() => User)
  @Column
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Objective)
  @Column
  objectiveId: string;

  @BelongsTo(() => Objective)
  objective: Objective;

  @Column
  progress: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BeforeCreate
  static generateId(instance: Progress) {
    instance.id = uuid();
  }
}
