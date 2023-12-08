import * as Joi from "joi";

export const queryMemeSchema = Joi.object({
  page: Joi.number().integer().min(1).optional(),
  pageSize: Joi.number().integer().min(1).max(100).optional(),
  search: Joi.string().optional(),
  sort: Joi.string().valid("ASC", "DESC").optional(),
});

/**
 * @swagger
 * components:
 *   schemas:
 *     QueryMemeDto:
 *       type: object
 *       properties:
 *         page:
 *           type: integer
 *         pageSize:
 *           type: integer
 *         search:
 *           type: string
 *         sort:
 *           type: string
 *           enum:
 *             - ASC
 *             - DESC
 */
export interface QueryMemeDto {
  page?: number;
  pageSize?: number;
  search?: string;
  sort?: "ASC" | "DESC";
}
