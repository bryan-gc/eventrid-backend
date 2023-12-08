/**
 * @swagger
 * components:
 *   schemas:
 *     CommentOutputDto:
 *       type: object
 *       required:
 *         - id
 *         - text
 *         - createdAt
 *         - memeId
 *         - userId
 *       properties:
 *         id:
 *           type: integer
 *         text:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *         memeId:
 *           type: integer
 *         userId:
 *           type: integer
 */
export interface CommentOutputDto {
  id: number;
  text: string;
  createdAt: string;
  updatedAt?: string;
  memeId: number;
  userId: number;
}
