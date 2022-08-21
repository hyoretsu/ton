import { BeforeCreate, Column, CreatedAt, DataType, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import { v4 as uuid } from 'uuid';

export interface IRegisterPhotoDTO {
  fileName: string;
  category: string;
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

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BeforeCreate
  static generateId(instance: DentalPhoto) {
    instance.id = uuid();
  }
}
