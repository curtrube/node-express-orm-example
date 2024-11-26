import { EntityManager, EntityRepository, MikroORM, Options } from '@mikro-orm/postgresql';
import { User } from './modules/user/user.entity.js';
import { Transaction } from './modules/transaction/transaction.entity.js';
import config from './mikro-orm.config.js';
import { UserRepository } from './modules/user/user.repository.js';

export interface Services {
  orm: MikroORM;
  em: EntityManager;
  transaction: EntityRepository<Transaction>;
  user: UserRepository;
}

let cache: Services;

export async function initORM(options?: Options): Promise<Services> {
  if (cache) {
    return cache;
  }

  const orm = await MikroORM.init(config);

  // save to cache before returning
  return (cache = {
    orm,
    em: orm.em,
    transaction: orm.em.getRepository(Transaction),
    user: orm.em.getRepository(User),
  });
}
