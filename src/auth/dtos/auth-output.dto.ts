/**
 * @swagger
 * components:
 *   schemas:
 *     AuthOutputDto:
 *       type: object
 *       required:
 *         - accessToken
 *         - refreshToken
 *         - expiresIn
 *       properties:
 *         accessToken:
 *           type: string
 *         refreshToken:
 *           type: string
 *         expiresIn:
 *           type: integer
 */
export interface AuthOutputDto {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
