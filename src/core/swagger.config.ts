import * as swaggerJSDoc from "swagger-jsdoc";

import { ErrorCodes } from "./constants/error-codes.constant";
import { enumToArray } from "./utils/array.util";

const swaggerDefinition: swaggerJSDoc.SwaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API Documentation",
    version: "1.0",
    description: "API Documentation Description",
  },
  components: {
    securitySchemes: {
      bearer: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      ResponseErrorDto: {
        type: "object",
        properties: {
          status: {
            type: "string",
            enum: ["error", "fail"],
          },
          code: {
            type: "string",
            enum: enumToArray(ErrorCodes),
          },
          data: {
            type: "array",
            items: {
              type: "string",
            },
          },
          message: {
            type: "string",
          },
        },
        required: ["status", "code"],
      },
    },
  },
};

const options: swaggerJSDoc.Options = {
  definition: swaggerDefinition,
  apis: ["./src/**/dtos/*.ts", "./src/**/routes/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
