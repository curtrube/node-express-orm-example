import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class User {
  @PrimaryKey()
  id!: number;

  @Property({ columnType: "character varying(50)" })
  firstName!: string;

  @Property()
  email!: string;

  @Property()
  password!: string;
}
