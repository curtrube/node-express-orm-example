import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Transaction } from '../transaction/transaction.entity.js';

@Entity()
export class User {
  @PrimaryKey()
  id!: number;

  @Property({ unique: true, columnType: 'character varying(100)' })
  email!: string;

  @Property()
  password!: string;

  @Property({ columnType: 'character varying(50)' })
  firstName!: string;

  @Property({ columnType: 'character varying(50)' })
  lastName!: string;

  @OneToMany({ mappedBy: 'user' })
  transactions = new Collection<Transaction>(this);
}
