import * as Joi from "joi";

export async function validateWithJoi(schema: Joi.ObjectSchema, data: any) {
  await schema.validateAsync(data, { abortEarly: false });
}
