import * as Joi from "joi";

export const createMemeSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  imageUrl: Joi.string().uri().required(),
});

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateMemeInputDto:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - imageUrl
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         imageUrl:
 *           type: string
 */
export interface CreateMemeInputDto {
  name: string;
  description: string;
  imageUrl: string;
}
