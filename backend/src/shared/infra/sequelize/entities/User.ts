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

import DentalPhoto from './DentalPhoto';

export interface ICreateUserDTO {
  name: string;
  parentName?: string;
  email: string;
  password: string;
  phoneNumber: string;
  birthDate: Date;
  city: string;
  neoplasia?: string;
  chartNumber?: string;
}

@Table
export default class User extends Model<User, ICreateUserDTO> {
  @PrimaryKey
  @Column(DataType.UUID)
  id: string;

  @Column
  name: string;

  @Column
  parentName?: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column
  phoneNumber: string;

  @Column
  birthDate: Date;

  @Column
  city: string;

  @HasMany(() => DentalPhoto)
  dentalPhotos: DentalPhoto[];

  @Column
  neoplasia?: string;

  @Column
  chartNumber?: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BeforeCreate
  static generateId(instance: User) {
    instance.id = uuid();
  }
}
