/**
 * @swagger
 * components:
 *   schemas:
 *     LikeOutputDto:
 *       type: object
 *       required:
 *         - id
 *         - memeId
 *         - userId
 *         - createdAt
 *       properties:
 *         id:
 *           type: integer
 *         memeId:
 *           type: integer
 *         userId:
 *           type: integer
 *         createdAt:
 *           type: string
 */
export interface LikeOutputDto {
  id: number;
  memeId: number;
  userId: number;
  createdAt: string;
}
