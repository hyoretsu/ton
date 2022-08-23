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

import User from './User';

export interface IRegisterPhotoDTO {
  fileName: string;
  category: string;
  patientId: string;
}

@Table
export default class DentalPhoto extends Model<DentalPhoto, IRegisterPhotoDTO> {
  @PrimaryKey
  @Column(DataType.UUID)
  id: string;

  @Column
  fileName: string;

  @Column
  category: string;

  @ForeignKey(() => User)
  @Column
  patientId: string;

  @BelongsTo(() => User)
  patient: User;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BeforeCreate
  static generateId(instance: DentalPhoto) {
    instance.id = uuid();
  }
}
