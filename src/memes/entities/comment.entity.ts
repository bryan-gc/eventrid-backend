import { Column, Entity, ManyToOne, Relation } from "typeorm";

import { ProjectBaseEntity } from "../../core/database/base-entity.entity";
import { User } from "../../users/entities/user.entity";
import { Meme } from "./meme.entity";

@Entity({ name: "Comment" })
export class Comment extends ProjectBaseEntity {
  @Column()
  text!: string;

  @ManyToOne(() => Meme, (meme) => meme.comments)
  meme!: Relation<Meme>;

  @ManyToOne(() => User, (user) => user.comments)
  user!: Relation<User>;
}
