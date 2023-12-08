/**
 * @swagger
 * components:
 *   schemas:
 *     UserRefreshTokenOutputDto:
 *       type: object
 *       required:
 *         - id
 *         - createdAt
 *         - refreshToken
 *         - expiredAt
 *         - isExpired
 *       properties:
 *         id:
 *           type: integer
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         refreshToken:
 *           type: string
 *         expiredAt:
 *           type: string
 *           format: date-time
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         isExpired:
 *           type: boolean
 */
export interface UserRefreshTokenOutputDto {
  id: number;
  createdAt: string;
  updatedAt?: string;
  refreshToken: string;
  expiredAt: string;
  deletedAt?: string;
  isExpired: boolean;
}
