import {
  BeforeCreate,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { v4 as uuid } from 'uuid';

import CheckupAnswer from './CheckupAnswer';
import DentalPhoto from './DentalPhoto';
import User from './User';

export interface ICreateCheckupDTO {
  patientId: string;
}

@Table
export default class Checkup extends Model<Checkup, ICreateCheckupDTO> {
  @PrimaryKey
  @Column(DataType.UUID)
  id: string;

  @ForeignKey(() => User)
  @Column
  patientId: string;

  @BelongsTo(() => User)
  patient: User;

  @HasMany(() => DentalPhoto)
  photos: DentalPhoto[];

  @HasMany(() => CheckupAnswer)
  answers: CheckupAnswer[];

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BeforeCreate
  static generateId(instance: Checkup) {
    instance.id = uuid();
  }
}
