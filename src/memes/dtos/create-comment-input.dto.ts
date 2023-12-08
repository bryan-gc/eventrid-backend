import * as Joi from "joi";

export const createCommentSchema = Joi.object({
  text: Joi.string().required(),
});

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateCommentDto:
 *       type: object
 *       required:
 *         - text
 *       properties:
 *         text:
 *           type: string
 */
export interface CreateCommentDto {
  text: string;
}
