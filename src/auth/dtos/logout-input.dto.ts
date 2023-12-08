import * as Joi from "joi";

/**
 * @swagger
 * components:
 *   schemas:
 *     LogoutInputDto:
 *       type: object
 *       required:
 *         - refreshToken
 *       properties:
 *         refreshToken:
 *           type: string
 */
export interface LogoutInputDto {
  refreshToken: string;
}

export const logoutInputSchema = Joi.object({
  refreshToken: Joi.string().required(),
});
