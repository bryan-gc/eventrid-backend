import { Comment } from "../../memes/entities/comment.entity";
import { Like } from "../../memes/entities/like.entity";
import { Meme } from "../../memes/entities/meme.entity";
import { User } from "../../users/entities/user.entity";
import { AppDataSource } from "../database/data-source";

AppDataSource.initialize()
  .then(async () => {
    const users: User[] = [];
    for (let i = 1; i <= 3; i++) {
      const newUser = AppDataSource.manager.create(User, {
        username: `user${i}`,
        // * password: administrator
        password:
          "$2b$10$UeK5Ce1nC9CvdDjZVnw7cuXZQROGZp1yIdOOgjzon5lJXGa8vGdni",
        firstName: `FirstName${i}`,
        lastName: `LastName${i}`,
      });
      users.push(newUser);
    }

    await AppDataSource.manager.save(users);

    const memes: Meme[] = [];
    for (const user of users) {
      for (let i = 0; i < 5; i++) {
        const newMeme = AppDataSource.manager.create(Meme, {
          name: `Meme ${i} from ${user.username}`,
          description: `Meme description ${i}`,
          imageUrl: `https://images.squarespace-cdn.com/content/v1/5a05ececd55b4165f250f032/ba3bc3a3-b21a-4538-ae39-2f7f9d9e8a6b/image-asset.png`,
          user: user,
        });
        memes.push(newMeme);
      }
    }

    await AppDataSource.manager.save(memes);

    for (const meme of memes) {
      const comments: Comment[] = [];
      const likes: Like[] = [];

      for (const user of users) {
        const newComment = AppDataSource.manager.create(Comment, {
          text: `Comment of ${user.username} in ${meme.name}`,
          user: user,
          meme: meme,
        });
        comments.push(newComment);

        const newLike = AppDataSource.manager.create(Like, {
          user: user,
          meme: meme,
        });
        likes.push(newLike);
      }

      await AppDataSource.manager.save(comments);
      await AppDataSource.manager.save(likes);
    }

    console.log("Seeder finished.");
  })
  .catch((error) => console.log(error))
  .finally(() => AppDataSource.destroy());
