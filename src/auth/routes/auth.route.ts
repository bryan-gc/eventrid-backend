import { Response } from "express";
import Router from "express-promise-router";

import { RequestUtil } from "../../core/types/request-custom.type";
import { sendSuccessResponse } from "../../core/utils/response.util";
import { validateWithJoi } from "../../core/utils/validation.util";
import { LoginInputDto, loginInputSchema } from "../dtos/login-input.dto";
import { LogoutInputDto, logoutInputSchema } from "../dtos/logout-input.dto";
import {
  RefreshTokenInputDto,
  refreshTokenInputSchema,
} from "../dtos/refresh-token-input.dto";
import {
  RegisterInputDto,
  registerInputSchema,
} from "../dtos/register-input.dto";
import * as AuthService from "../services/auth.service";

const router = Router();

const parentRoute = "/auth";

/**
 * @swagger
 * components:
 *   schemas:
 *     AuthLoginResponse:
 *       type: object
 *       required: [status, data]
 *       properties:
 *         status:
 *           type: string
 *           default: 'success'
 *           enum: ['success']
 *         data:
 *           $ref: '#/components/schemas/AuthOutputDto'
 * /api/auth/login:
 *   post:
 *     tags: [auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInputDto'
 *     responses:
 *       200:
 *         description: ''
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthLoginResponse'
 *       400:
 *         description: ''
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseErrorDto'
 */
router.post(
  `${parentRoute}/login`,
  async (req: RequestUtil<{ body: LoginInputDto }>, res: Response) => {
    await validateWithJoi(loginInputSchema, req.body);
    const authDto = await AuthService.login(req.body);
    sendSuccessResponse(res, authDto);
  }
);

/**
 * @swagger
 * components:
 *   schemas:
 *     AuthLogoutResponse:
 *       type: object
 *       required: [status, data]
 *       properties:
 *         status:
 *           type: string
 *           default: 'success'
 *           enum: ['success']
 *         data:
 *           $ref: '#/components/schemas/UserRefreshTokenOutputDto'
 * /api/auth/logout:
 *   post:
 *     tags: [auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LogoutInputDto'
 *     responses:
 *       200:
 *         description: ''
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthLogoutResponse'
 *       400:
 *         description: ''
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseErrorDto'
 */
router.post(
  `${parentRoute}/logout`,
  async (req: RequestUtil<{ body: LogoutInputDto }>, res: Response) => {
    await validateWithJoi(logoutInputSchema, req.body);
    const userRefreshToken = await AuthService.logout(req.body.refreshToken);
    sendSuccessResponse(res, userRefreshToken);
  }
);

/**
 * @swagger
 * components:
 *   schemas:
 *     AuthRegisterResponse:
 *       type: object
 *       required: [status, data]
 *       properties:
 *         status:
 *           type: string
 *           default: 'success'
 *           enum: ['success']
 *         data:
 *           $ref: '#/components/schemas/UserOutputDto'
 * /api/auth/register:
 *   post:
 *     tags: [auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterInputDto'
 *     responses:
 *       200:
 *         description: ''
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthRegisterResponse'
 *       400:
 *         description: ''
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseErrorDto'
 */
router.post(
  `${parentRoute}/register`,
  async (req: RequestUtil<{ body: RegisterInputDto }>, res: Response) => {
    await validateWithJoi(registerInputSchema, req.body);
    const user = await AuthService.registerUser(req.body);
    sendSuccessResponse(res, user);
  }
);

/**
 * @swagger
 * components:
 *   schemas:
 *     AuthRefreshTokenResponse:
 *       type: object
 *       required: [status, data]
 *       properties:
 *         status:
 *           type: string
 *           default: 'success'
 *           enum: ['success']
 *         data:
 *           $ref: '#/components/schemas/AuthOutputDto'
 * /api/auth/refresh-token:
 *   post:
 *     tags: [auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshTokenInputDto'
 *     responses:
 *       200:
 *         description: ''
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthRefreshTokenResponse'
 *       400:
 *         description: ''
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseErrorDto'
 */
router.post(
  `${parentRoute}/refresh-token`,
  async (req: RequestUtil<{ body: RefreshTokenInputDto }>, res: Response) => {
    await validateWithJoi(refreshTokenInputSchema, req.body);
    const authDto = await AuthService.refreshAccesstoken(req.body.refreshToken);
    sendSuccessResponse(res, authDto);
  }
);

/**
 * @swagger
 * components:
 *   schemas:
 *     AuthRefreshTokenStatusResponse:
 *       type: object
 *       required: [status, data]
 *       properties:
 *         status:
 *           type: string
 *           default: 'success'
 *           enum: ['success']
 *         data:
 *           $ref: '#/components/schemas/UserRefreshTokenOutputDto'
 * /api/refresh-token-status/{refreshToken}:
 *   get:
 *     tags: [auth]
 *     parameters:
 *       - in: path
 *         name: refreshToken
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: ''
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthRefreshTokenStatusResponse'
 *       400:
 *         description: ''
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseErrorDto'
 */
router.get(
  `${parentRoute}/refresh-token-status/:refreshToken`,
  async (
    req: RequestUtil<{ params: { refreshToken: string } }>,
    res: Response
  ) => {
    const userRefreshToken = await AuthService.findRefreshToken(
      req.params.refreshToken
    );
    sendSuccessResponse(res, userRefreshToken);
  }
);

export default router;
