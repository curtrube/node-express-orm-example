import { MikroORM } from "@mikro-orm/postgresql"; // or any other driver package
import config from "./mikro-orm.config.js";
import { User } from "./modules/user/user.entity.js";

// initialize the ORM, loading the config file dynamically
const orm = await MikroORM.init(config);

// recreate the database schema
await orm.schema.refreshDatabase();

// fork first to have a separate context
const em = orm.em.fork();

// create new user entity instance
const user = new User();
user.email = "foo@bar.com";
user.firstName = "Foo";
user.password = "123456";

// first mark the entity with `persist()`, then `flush()`
await em.persist(user).flush();

// after the entity is flushed, it becomes managed, and has the PK available
// console.log("user id is:", user.id);

const queryUser = await em.findOne(User, 1);

console.log(typeof queryUser);
