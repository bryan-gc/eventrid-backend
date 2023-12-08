import { Entity, ManyToOne, Relation, Unique } from "typeorm";

import { ProjectBaseEntity } from "../../core/database/base-entity.entity";
import { User } from "../../users/entities/user.entity";
import { Meme } from "./meme.entity";

@Entity({ name: "Like" })
@Unique(["meme", "user"])
export class Like extends ProjectBaseEntity {
  @ManyToOne(() => Meme, (meme) => meme.likes)
  meme!: Relation<Meme>;

  @ManyToOne(() => User, (user) => user.likes)
  user!: Relation<User>;
}
