/**
 * @swagger
 * components:
 *   schemas:
 *     UserOutputDto:
 *       type: object
 *       required:
 *         - username
 *         - password
 *         - firstName
 *         - lastName
 *         - id
 *         - createdAt
 *       properties:
 *         username:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         id:
 *           type: integer
 *         createdAt:
 *           type: string
 *           format: date-time
 */
export interface UserOutputDto {
  username: string;
  firstName: string;
  lastName: string;
  updatedAt?: string;
  id: number;
  createdAt: string;
}
