import { NextFunction, Request, Response } from 'express';
import { DataResponseFactory, StatusCodes } from '@kishornaik/utils';
import rateLimit from 'express-rate-limit';
import { GLOBAL_WINDOW_MINUTES, RATE_LIMITER } from '@/config/env';

export const rateLimitMiddleware = rateLimit({
	windowMs: parseInt(GLOBAL_WINDOW_MINUTES) * 60 * 1000, // 15 minutes
	max: parseInt(RATE_LIMITER),
	handler: (req: Request, res: Response) => {
		const response = DataResponseFactory.response(
			false,
			StatusCodes.TOO_MANY_REQUESTS,
			null!,
			`Too many requests from this IP, please try again after ${GLOBAL_WINDOW_MINUTES} minutes`
		);

		res.status(StatusCodes.TOO_MANY_REQUESTS).json(response);
	},
	standardHeaders: true,
	legacyHeaders: false,
	keyGenerator: (req: Request) => req.ip,
});
