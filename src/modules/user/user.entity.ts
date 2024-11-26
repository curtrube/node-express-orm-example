import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Transaction } from '../transaction/transaction.entity.js';
import { UserRepository } from './user.repository.js';

@Entity({ repository: () => UserRepository })
export class User {
  @PrimaryKey()
  id!: number;

  @Property({ unique: true, length: 100 })
  email!: string;

  @Property()
  password!: string;

  @Property({ length: 50 })
  firstName!: string;

  @Property({ length: 50 })
  lastName!: string;

  @OneToMany({ mappedBy: 'user' })
  transactions = new Collection<Transaction>(this);

  constructor(email: string, password: string, firstName: string, lastName: string) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
