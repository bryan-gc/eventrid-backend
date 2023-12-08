import { Response } from "express";
import Router from "express-promise-router";

import { verifyToken } from "../../core/middlewares/auth.middleware";
import { RequestUtilWithAuth } from "../../core/types/request-custom.type";
import { sendSuccessResponse } from "../../core/utils/response.util";
import * as UsersService from "../services/users.service";

const router = Router();

const parentRoute = "/users";

/**
 * @swagger
 * components:
 *   schemas:
 *     UsersMeResponse:
 *       type: object
 *       required: [status, data]
 *       properties:
 *         status:
 *           type: string
 *           default: 'success'
 *           enum: ['success']
 *         data:
 *           $ref: '#/components/schemas/UserOutputDto'
 * /api/users/me:
 *   get:
 *     tags: [users]
 *     security:
 *       - bearer: []
 *     responses:
 *       200:
 *         description: ''
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsersMeResponse'
 *       400:
 *         description: ''
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseErrorDto'
 */
router.get(
  `${parentRoute}/me`,
  verifyToken,
  async (req: RequestUtilWithAuth, res: Response) => {
    const userRefreshToken = await UsersService.findUserById(req.user.uid);
    sendSuccessResponse(res, userRefreshToken);
  }
);

export default router;
