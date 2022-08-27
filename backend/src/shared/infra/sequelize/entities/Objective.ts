import { BeforeCreate, Column, CreatedAt, DataType, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import { v4 as uuid } from 'uuid';

export interface ICreateObjectiveDTO {
  title: string;
  goal: string;
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
  isDaily: boolean;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BeforeCreate
  static generateId(instance: Objective) {
    instance.id = uuid();
  }
}
