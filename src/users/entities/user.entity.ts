import { Column, Entity, OneToMany } from "typeorm";

import { ProjectBaseEntity } from "../../core/database/base-entity.entity";
import { Comment } from "../../memes/entities/comment.entity";
import { Like } from "../../memes/entities/like.entity";
import { UserRefreshToken } from "./user-refresh-token.entity";
import { Meme } from "../../memes/entities/meme.entity";

@Entity({ name: "User" })
export class User extends ProjectBaseEntity {
  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Column()
  firstName!: string;

  @Column({ nullable: true })
  lastName!: string;

  @OneToMany(() => UserRefreshToken, (refreshToken) => refreshToken.user)
  userRefreshTokens!: UserRefreshToken[];

  @OneToMany(() => Like, (like) => like.user)
  likes!: Like[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments!: Comment[];

  @OneToMany(() => Meme, (meme) => meme.user)
  memes!: Meme[];
}
