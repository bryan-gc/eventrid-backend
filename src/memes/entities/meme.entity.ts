import { Column, Entity, ManyToOne, OneToMany, Relation } from "typeorm";

import { ProjectBaseEntity } from "../../core/database/base-entity.entity";
import { Comment } from "./comment.entity";
import { Like } from "./like.entity";
import { User } from "../../users/entities/user.entity";

@Entity({ name: "Meme" })
export class Meme extends ProjectBaseEntity {
  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  imageUrl!: string;

  @OneToMany(() => Comment, (comment) => comment.meme)
  comments!: Comment[];

  @OneToMany(() => Like, (like) => like.meme)
  likes!: Like[];

  @Column({ nullable: true, type: "timestamp" })
  deletedAt?: Date;

  @ManyToOne(() => User, (user) => user.comments)
  user!: Relation<User>;
}
