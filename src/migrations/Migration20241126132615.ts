import { Migration } from '@mikro-orm/migrations';

export class Migration20241126132615 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "user" ("id" serial primary key, "email" varchar(100) not null, "password" varchar(255) not null, "first_name" varchar(50) not null, "last_name" varchar(50) not null);`);
    this.addSql(`alter table "user" add constraint "user_email_unique" unique ("email");`);

    this.addSql(`create table "transaction" ("id" serial primary key, "merchant" varchar(100) not null, "amount" int not null, "user_id" int not null);`);

    this.addSql(`alter table "transaction" add constraint "transaction_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`);
  }

}
