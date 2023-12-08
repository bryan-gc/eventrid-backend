import * as Joi from "joi";

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterInputDto:
 *       type: object
 *       required:
 *         - username
 *         - password
 *         - firstName
 *         - lastName
 *       properties:
 *         username:
 *           type: string
 *         password:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 */
export interface RegisterInputDto {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const registerInputSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
});
