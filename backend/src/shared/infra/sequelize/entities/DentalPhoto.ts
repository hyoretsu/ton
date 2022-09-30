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

export interface IRegisterPhotoDTO {
  fileName: string;
  category: string;
  checkupId: string;
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

  @ForeignKey(() => Checkup)
  @Column
  checkupId: string;

  @BelongsTo(() => Checkup)
  checkup: Checkup;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BeforeCreate
  static generateId(instance: DentalPhoto) {
    instance.id = uuid();
  }
}
