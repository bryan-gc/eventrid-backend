/**
 * @swagger
 * components:
 *   schemas:
 *     MemeOutputDto:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - description
 *         - imageUrl
 *         - likeCount
 *         - commentCount
 *         - createdAt
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         imageUrl:
 *           type: string
 *         likeCount:
 *           type: integer
 *         commentCount:
 *           type: integer
 *         createdAt:
 *           type: string
 */
export interface MemeOutputDto {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
}
