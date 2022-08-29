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

import Content from './Content';

export interface ICreateContentMessageDTO {
  contentId: string;
  message: string;
}

@Table
export default class ContentMessage extends Model<ContentMessage, ICreateContentMessageDTO> {
  @PrimaryKey
  @Column(DataType.UUID)
  id: string;

  @ForeignKey(() => Content)
  @Column
  contentId: string;

  @BelongsTo(() => Content)
  content: Content;

  @Column
  message: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BeforeCreate
  static generateId(instance: ContentMessage) {
    instance.id = uuid();
  }
}
