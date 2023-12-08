import * as Joi from "joi";

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginInputDto:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *         password:
 *           type: string
 */
export interface LoginInputDto {
  username: string;
  password: string;
}

export const loginInputSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});
