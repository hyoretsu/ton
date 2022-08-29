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

import ContentMessage from './ContentMessage';

export interface ICreateContentDTO {
  title: string;
  condition: number;
}

@Table
export default class Content extends Model<Content, ICreateContentDTO> {
  @PrimaryKey
  @Column(DataType.UUID)
  id: string;

  @Column
  title: string;

  @HasMany(() => ContentMessage)
  messages: ContentMessage[];

  @Column
  condition: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BeforeCreate
  static generateId(instance: Content) {
    instance.id = uuid();
  }
}
