import { IsNull, Like } from "typeorm";

import { ErrorCodes } from "../../core/constants/error-codes.constant";
import { AppDataSource } from "../../core/database/data-source";
import { ApiConflictException } from "../../core/exceptions/api-conflict.exception";
import { Meta } from "../../core/utils/response.util";
import { CommentOutputDto } from "../dtos/comment-output.dto";
import { CreateCommentDto } from "../dtos/create-comment-input.dto";
import { CreateMemeInputDto } from "../dtos/create-meme-input.dto";
import { LikeOutputDto } from "../dtos/like-output.dto";
import { MemeOutputDto } from "../dtos/meme-output.dto";
import { QueryMemeDto } from "../dtos/query-meme.dto";
import { Comment } from "../entities/comment.entity";
import { Like as LikeBD } from "../entities/like.entity";
import { Meme } from "../entities/meme.entity";

export async function getPaginatedMemes(query: QueryMemeDto) {
  const page = query.page || 1;
  const pageSize = query.pageSize || 5;
  const search = query.search || "";
  const sort = query.sort || "ASC";

  const [memes, total] = await AppDataSource.manager.findAndCount(Meme, {
    where: {
      name: Like(`%${search}%`),
      deletedAt: IsNull(),
    },
    order: {
      createdAt: sort,
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
    relations: ["comments", "likes"],
  });

  const memesOutput: MemeOutputDto[] = memes.map((meme) => {
    const likeCount = meme.likes.length;
    const commentCount = meme.comments.length;

    return {
      id: meme.id,
      name: meme.name,
      description: meme.description,
      imageUrl: meme.imageUrl,
      likeCount,
      commentCount,
      createdAt: meme.createdAt.toISOString(),
    };
  });

  const meta: Meta = {
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
    count: memesOutput.length,
  };

  return { data: memesOutput, meta };
}

export async function getMemeById(memeId: number) {
  const meme = await AppDataSource.manager.findOneOrFail(Meme, {
    where: {
      id: memeId,
      deletedAt: IsNull(),
    },
    relations: ["comments", "likes"],
  });

  const memeOutput: MemeOutputDto = {
    id: meme.id,
    name: meme.name,
    description: meme.description,
    imageUrl: meme.imageUrl,
    likeCount: meme.likes.length,
    commentCount: meme.comments.length,
    createdAt: meme.createdAt.toISOString(),
  };

  return memeOutput;
}

export async function createMeme(
  createMemeDto: CreateMemeInputDto,
  userId: number
) {
  const newMeme = AppDataSource.manager.create(Meme, {
    name: createMemeDto.name,
    description: createMemeDto.description,
    imageUrl: createMemeDto.imageUrl,
    user: { id: userId },
  });

  const savedMeme = await AppDataSource.manager.save(newMeme);

  const memeOutput: MemeOutputDto = {
    id: savedMeme.id,
    name: savedMeme.name,
    description: savedMeme.description,
    imageUrl: savedMeme.imageUrl,
    likeCount: 0,
    commentCount: 0,
    createdAt: savedMeme.createdAt.toISOString(),
  };

  return memeOutput;
}

export async function softDeleteMeme(memeId: number, userId: number) {
  const meme = await AppDataSource.manager.findOneOrFail(Meme, {
    where: {
      id: memeId,
      user: { id: userId },
      deletedAt: IsNull(),
    },
    relations: ["user"],
  });

  meme.deletedAt = new Date();
  await AppDataSource.manager.save(meme);

  const memeOutput: MemeOutputDto = {
    id: meme.id,
    name: meme.name,
    description: meme.description,
    imageUrl: meme.imageUrl,
    likeCount: 0,
    commentCount: 0,
    createdAt: meme.createdAt.toISOString(),
  };

  return memeOutput;
}

export async function addCommentToMeme(
  memeId: number,
  userId: number,
  commentData: CreateCommentDto
) {
  // * We only want it to fail if there is no meme with the id
  await AppDataSource.manager.findOneOrFail(Meme, {
    where: { id: memeId, deletedAt: IsNull() },
  });

  const newComment = AppDataSource.manager.create(Comment, {
    text: commentData.text,
    meme: { id: memeId },
    user: { id: userId },
  });

  const savedComment = await AppDataSource.manager.save(newComment);

  const commentOutput: CommentOutputDto = {
    id: savedComment.id,
    text: savedComment.text,
    createdAt: savedComment.createdAt.toISOString(),
    memeId: memeId,
    userId: userId,
  };

  return commentOutput;
}

export async function deleteComment(commentId: number, userId: number) {
  const comment = await AppDataSource.manager.findOneOrFail(Comment, {
    where: { id: commentId, user: { id: userId } },
    relations: ["user", "meme"],
  });

  await AppDataSource.manager.remove(comment);

  const commentOutput: CommentOutputDto = {
    id: comment.id,
    text: comment.text,
    createdAt: comment.createdAt.toISOString(),
    memeId: comment.meme.id,
    userId: comment.user.id,
  };
  return commentOutput;
}

export async function addLikeToMeme(memeId: number, userId: number) {
  await AppDataSource.manager.findOneOrFail(Meme, {
    where: { id: memeId, deletedAt: IsNull() },
  });

  const existingLike = await AppDataSource.manager.findOneBy(LikeBD, {
    meme: { id: memeId },
    user: { id: userId },
  });

  // * Is going to throw an error at dabase level anyway because of the unique
  if (existingLike)
    throw new ApiConflictException(ErrorCodes.LIKE_ALREADY_SUBMITED);

  const newLike = AppDataSource.manager.create(LikeBD, {
    meme: { id: memeId },
    user: { id: userId },
  });

  const savedLike = await AppDataSource.manager.save(newLike);

  const likeOutput: LikeOutputDto = {
    id: savedLike.id,
    memeId: savedLike.meme.id,
    userId: savedLike.user.id,
    createdAt: savedLike.createdAt.toISOString(),
  };

  return likeOutput;
}

export async function removeLikeFromMeme(memeId: number, userId: number) {
  const like = await AppDataSource.manager.findOneOrFail(LikeBD, {
    where: { meme: { id: memeId }, user: { id: userId } },
    relations: ["meme", "user"],
  });

  await AppDataSource.manager.remove(like);

  const likeOutput: LikeOutputDto = {
    id: like.id,
    memeId: like.meme.id,
    userId: like.user.id,
    createdAt: like.createdAt.toISOString(),
  };

  return likeOutput;
}

export async function getCommentsByMemeId(memeId: number) {
  const comments = await AppDataSource.manager.find(Comment, {
    where: {
      meme: { id: memeId },
    },
    relations: ["user"],
  });

  const commentsOutput: CommentOutputDto[] = comments.map((comment) => ({
    id: comment.id,
    text: comment.text,
    createdAt: comment.createdAt.toISOString(),
    memeId: memeId,
    userId: comment.user.id,
  }));

  return commentsOutput;
}
