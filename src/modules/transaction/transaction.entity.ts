import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { User } from '../user/user.entity.js';

@Entity()
export class Transaction {
  @PrimaryKey()
  id!: number;

  @Property({ length: 100 })
  merchant!: string;

  @Property()
  amount!: number;

  @Property()
  date!: Date;

  @ManyToOne()
  user!: User;
}
