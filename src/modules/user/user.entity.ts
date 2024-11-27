import { Collection, Entity, OneToMany, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';
import { Transaction } from '../transaction/transaction.entity.js';
import { UserRepository } from './user.repository.js';
import { lazy } from 'zod';

@Entity({ repository: () => UserRepository })
export class User {
  [OptionalProps]?: 'createdAt' | 'updatedAt';

  @PrimaryKey()
  id!: number;

  @Property({ unique: true, length: 100 })
  email!: string;

  @Property({ hidden: true, lazy: true })
  password!: string;

  @Property({ length: 50 })
  firstName!: string;

  @Property({ length: 50 })
  lastName!: string;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @OneToMany({ mappedBy: 'user' })
  transactions = new Collection<Transaction>(this);

  constructor(email: string, password: string, firstName: string, lastName: string) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
