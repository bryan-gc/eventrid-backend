import { Response } from "express";
import Router from "express-promise-router";

import { verifyToken } from "../../core/middlewares/auth.middleware";
import {
  BaseParams,
  RequestUtilWithAuth,
} from "../../core/types/request-custom.type";
import { sendSuccessResponse } from "../../core/utils/response.util";
import { validateWithJoi } from "../../core/utils/validation.util";
import {
  CreateCommentDto,
  createCommentSchema,
} from "../dtos/create-comment-input.dto";
import {
  CreateMemeInputDto,
  createMemeSchema,
} from "../dtos/create-meme-input.dto";
import { QueryMemeDto, queryMemeSchema } from "../dtos/query-meme.dto";
import * as MemeService from "../services/memes.service";

const router = Router();

const parentRoute = "/memes";

/**
 * @swagger
 * components:
 *   schemas:
 *     MemeFindAllResponse:
 *       type: object
 *       required: [status, data]
 *       properties:
 *         status:
 *           type: string
 *           default: 'success'
 *           enum: ['success']
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/MemeOutputDto'
 * /api/memes:
 *   get:
 *     tags: [memes]
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: ['ASC', 'DESC']
 *     responses:
 *       200:
 *         description: ''
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MemeFindAllResponse'
 *       400:
 *         description: ''
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseErrorDto'
 */
router.get(
  `${parentRoute}`,
  verifyToken,
  async (req: RequestUtilWithAuth<{ query: QueryMemeDto }>, res: Response) => {
    await validateWithJoi(queryMemeSchema, req.query);
    const { data: memes, meta } = await MemeService.getPaginatedMemes(
      req.query
    );
    sendSuccessResponse(res, memes, meta);
  }
);

/**
 * @swagger
 * components:
 *   schemas:
 *     MemeSingleResponse:
 *       type: object
 *       required: [status, data]
 *       properties:
 *         status:
 *           type: string
 *           default: 'success'
 *           enum: ['success']
 *         data:
 *           $ref: '#/components/schemas/MemeOutputDto'
 * /api/memes/{id}:
 *   get:
 *     tags: [memes]
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: ''
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MemeSingleResponse'
 *       400:
 *         description: ''
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseErrorDto'
 */
router.get(
  `${parentRoute}/:id`,
  verifyToken,
  async (
    req: RequestUtilWithAuth<{ params: { id: string } }>,
    res: Response
  ) => {
    const memeId = parseInt(req.params.id);
    const meme = await MemeService.getMemeById(memeId);
    sendSuccessResponse(res, meme);
  }
);

/**
 * @swagger
 * components:
 *   schemas:
 *     MemeCreateResponse:
 *       type: object
 *       required: [status, data]
 *       properties:
 *         status:
 *           type: string
 *           default: 'success'
 *           enum: ['success']
 *         data:
 *           $ref: '#/components/schemas/MemeOutputDto'
 * /api/memes:
 *   post:
 *     tags: [memes]
 *     security:
 *       - bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateMemeInputDto'
 *     responses:
 *       200:
 *         description: ''
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MemeCreateResponse'
 *       400:
 *         description: ''
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseErrorDto'
 */
router.post(
  `${parentRoute}`,
  verifyToken,
  async (
    req: RequestUtilWithAuth<{ body: CreateMemeInputDto }>,
    res: Response
  ) => {
    await validateWithJoi(createMemeSchema, req.body);
    const memeOutputDto = await MemeService.createMeme(req.body, req.user.uid);
    sendSuccessResponse(res, memeOutputDto);
  }
);

/**
 * @swagger
 * components:
 *   schemas:
 *     MemeDeleteResponse:
 *       type: object
 *       required: [status, data]
 *       properties:
 *         status:
 *           type: string
 *           default: 'success'
 *           enum: ['success']
 *         data:
 *           $ref: '#/components/schemas/MemeOutputDto'
 * /api/memes/{id}:
 *   delete:
 *     tags: [memes]
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: ''
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MemeDeleteResponse'
 *       400:
 *         description: ''
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseErrorDto'
 */
router.delete(
  `${parentRoute}/:id`,
  verifyToken,
  async (req: RequestUtilWithAuth<{ params: BaseParams }>, res: Response) => {
    const memeId = parseInt(req.params.id);
    const userId = req.user.uid;
    const memeOutputDto = await MemeService.softDeleteMeme(memeId, userId);
    sendSuccessResponse(res, memeOutputDto);
  }
);

/**
 * @swagger
 * components:
 *   schemas:
 *     MemeCommentsResponse:
 *       type: object
 *       required: [status, data]
 *       properties:
 *         status:
 *           type: string
 *           default: 'success'
 *           enum: ['success']
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CommentOutputDto'
 * /api/memes/{id}/comments:
 *   get:
 *     tags: [memes]
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: ''
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MemeCommentsResponse'
 *       400:
 *         description: ''
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseErrorDto'
 */
router.get(
  `${parentRoute}/:id/comments`,
  verifyToken,
  async (req: RequestUtilWithAuth<{ params: BaseParams }>, res: Response) => {
    const memeId = parseInt(req.params.id);
    const comments = await MemeService.getCommentsByMemeId(memeId);
    sendSuccessResponse(res, comments);
  }
);

/**
 * @swagger
 * components:
 *   schemas:
 *     MemeAddCommentResponse:
 *       type: object
 *       required: [status, data]
 *       properties:
 *         status:
 *           type: string
 *           default: 'success'
 *           enum: ['success']
 *         data:
 *           $ref: '#/components/schemas/CommentOutputDto'
 * /api/memes/{id}/comments:
 *   post:
 *     tags: [memes]
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCommentDto'
 *     responses:
 *       200:
 *         description: ''
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MemeAddCommentResponse'
 *       400:
 *         description: ''
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseErrorDto'
 */
router.post(
  `${parentRoute}/:id/comments`,
  verifyToken,
  async (
    req: RequestUtilWithAuth<{ params: BaseParams; body: CreateCommentDto }>,
    res: Response
  ) => {
    const memeId = parseInt(req.params.id);
    const userId = req.user.uid;
    const commentData = req.body;

    await validateWithJoi(createCommentSchema, commentData);
    const commentOutput = await MemeService.addCommentToMeme(
      memeId,
      userId,
      commentData
    );
    sendSuccessResponse(res, commentOutput);
  }
);

/**
 * @swagger
 * components:
 *   schemas:
 *     CommentDeleteResponse:
 *       type: object
 *       required: [status, data]
 *       properties:
 *         status:
 *           type: string
 *           default: 'success'
 *           enum: ['success']
 *         data:
 *           $ref: '#/components/schemas/CommentOutputDto'
 * /api/comments/{id}:
 *   delete:
 *     tags: [memes]
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: ''
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommentDeleteResponse'
 *       400:
 *         description: ''
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseErrorDto'
 */
router.delete(
  "/comments/:id",
  verifyToken,
  async (req: RequestUtilWithAuth<{ params: BaseParams }>, res: Response) => {
    const commentId = parseInt(req.params.id);
    const userId = req.user.uid;
    const deletedComment = await MemeService.deleteComment(commentId, userId);
    sendSuccessResponse(res, deletedComment);
  }
);

/**
 * @swagger
 * components:
 *   schemas:
 *     MemeLikeResponse:
 *       type: object
 *       required: [status, data]
 *       properties:
 *         status:
 *           type: string
 *           default: 'success'
 *           enum: ['success']
 *         data:
 *           $ref: '#/components/schemas/LikeOutputDto'
 * /api/memes/{id}/likes:
 *   post:
 *     tags: [memes]
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: ''
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MemeLikeResponse'
 *       400:
 *         description: ''
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseErrorDto'
 */
router.post(
  `${parentRoute}/:id/likes`,
  verifyToken,
  async (req: RequestUtilWithAuth<{ params: BaseParams }>, res: Response) => {
    const memeId = parseInt(req.params.id);
    const userId = req.user.uid;
    const likeOutput = await MemeService.addLikeToMeme(memeId, userId);
    sendSuccessResponse(res, likeOutput);
  }
);

/**
 * @swagger
 * components:
 *   schemas:
 *     MemeUnlikeResponse:
 *       type: object
 *       required: [status, data]
 *       properties:
 *         status:
 *           type: string
 *           default: 'success'
 *           enum: ['success']
 *         data:
 *           $ref: '#/components/schemas/LikeOutputDto'
 * /api/memes/{id}/likes:
 *   delete:
 *     tags: [memes]
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: ''
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MemeUnlikeResponse'
 *       400:
 *         description: ''
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseErrorDto'
 */
router.delete(
  `${parentRoute}/:id/likes`,
  verifyToken,
  async (req: RequestUtilWithAuth<{ params: BaseParams }>, res: Response) => {
    const memeId = parseInt(req.params.id);
    const userId = req.user.uid;
    const likeOutputDto = await MemeService.removeLikeFromMeme(memeId, userId);
    sendSuccessResponse(res, likeOutputDto);
  }
);

export default router;
