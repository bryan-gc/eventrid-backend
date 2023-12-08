import * as Joi from "joi";

/**
 * @swagger
 * components:
 *   schemas:
 *     RefreshTokenInputDto:
 *       type: object
 *       required:
 *         - refreshToken
 *       properties:
 *         refreshToken:
 *           type: string
 */
export interface RefreshTokenInputDto {
  refreshToken: string;
}

export const refreshTokenInputSchema = Joi.object({
  refreshToken: Joi.string().required(),
});
