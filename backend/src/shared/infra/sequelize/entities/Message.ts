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

export interface ICreateMessageDTO {
  senderId: string;
  body: string;
  recipientId: string;
}

@Table
export default class Message extends Model<Message, ICreateMessageDTO> {
  @PrimaryKey
  @Column(DataType.UUID)
  id: string;

  @ForeignKey(() => User)
  @Column
  senderId: string;

  @BelongsTo(() => User)
  sender: User;

  @Column
  body: string;

  @ForeignKey(() => User)
  @Column
  recipientId: string;

  @BelongsTo(() => User)
  recipient: User;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BeforeCreate
  static generateId(instance: Message) {
    instance.id = uuid();
  }
}
