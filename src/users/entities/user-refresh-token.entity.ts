import { Column, Entity, JoinColumn, ManyToOne, Relation } from "typeorm";

import { ProjectBaseEntity } from "../../core/database/base-entity.entity";
import { User } from "./user.entity";

@Entity({ name: "UserRefreshToken" })
export class UserRefreshToken extends ProjectBaseEntity {
  @ManyToOne(() => User, (user) => user.userRefreshTokens)
  @JoinColumn({ name: "userId" })
  user!: Relation<User>;

  @Column({ unique: true })
  refreshToken!: string;

  @Column()
  expiredAt!: Date;

  @Column({ nullable: true })
  deletedAt?: Date;
}
