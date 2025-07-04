import { JwtService } from '@/shared/services/users/userJwt.Service';
import { IClaims } from '@/shared/services/users/userTokenProvider.service';
import { Container } from '@kishornaik/utils';
import { initTRPC, TRPCError } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';

// created for each request
const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => {
	const getAuthorization = () => {
		if (req.headers.authorization) {
			const token = req.headers.authorization?.split(' ')[1];
		}
		return null;
	};

	return {
		req,
		res,
	};
}; // no context
type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();
const router = t.router;
const publicProcedure = t.procedure;
const middleware = t.middleware;
const mergeRouters = t.mergeRouters;

const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
	const { req, res } = ctx;

	if (!req.headers.authorization)
		throw new TRPCError({
			code: 'UNAUTHORIZED',
			message: 'Unauthorized',
		});

	const token = req.headers.authorization?.split(' ')[1];
	if (!token)
		throw new TRPCError({
			code: 'UNAUTHORIZED',
			message: 'Unauthorized',
		});

	const jwtService: JwtService = Container.get(JwtService);
	const claims: IClaims = await jwtService.getClaimsFromAccessTokenAsync(token);

	if (!claims)
		throw new TRPCError({
			code: 'UNAUTHORIZED',
			message: 'Unauthorized',
		});

	return next({
		ctx: {
			...ctx,
			claims,
		},
	});
});

export const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
	if (ctx.claims.role !== 'admin') {
		throw new TRPCError({ code: 'FORBIDDEN' });
	}
	return next({
		ctx: {
			...ctx,
		},
	});
});

export { router, publicProcedure, middleware, mergeRouters, createContext, protectedProcedure };
