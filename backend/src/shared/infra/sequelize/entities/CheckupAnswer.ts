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

import Checkup from './Checkup';

export interface ICreateCheckupAnswerDTO {
  checkupId: string;
  question: string;
  answer: string;
}

@Table
export default class CheckupAnswer extends Model<CheckupAnswer, ICreateCheckupAnswerDTO> {
  @PrimaryKey
  @Column(DataType.UUID)
  id: string;

  @ForeignKey(() => Checkup)
  @Column
  checkupId: string;

  @BelongsTo(() => Checkup)
  checkup: Checkup;

  @Column
  question: string;

  @Column
  answer: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BeforeCreate
  static generateId(instance: CheckupAnswer) {
    instance.id = uuid();
  }
}
