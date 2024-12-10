import { EntityRepository } from '@mikro-orm/postgresql';
import { User } from './user.entity.js';

export class UserRepository extends EntityRepository<User> {
  async exists(email: string): Promise<boolean> {
    const count = await this.qb().where({ email }).getCount();
    return count > 0;
  }

  async login(email: string, password: string) {
    const err = new Error('Invalid combination of email and password');
    const user = await this.findOneOrFail(
      { email },
      {
        populate: ['password'], // password is a lazy property, we need to populate it
        failHandler: () => err,
      }
    );
    if (await user.verifyPassword(password)) {
      return user;
    }

    throw err;
  }
}
