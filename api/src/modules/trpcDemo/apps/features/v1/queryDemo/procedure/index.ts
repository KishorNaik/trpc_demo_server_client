import { protectedProcedure, publicProcedure } from '@/config/trpc';
import z from 'zod';
import { QueryRequestDto, QueryResponseDto } from '../contracts';
import { TRPCError } from '@trpc/server';

/*
  READ
*/

/*
curl --location 'http://localhost:3000/trpc/v1_demo.query_demo' \
--header 'Content-Type: application/json' \
--data '{
    "id":1
}'
*/

//const getInputSchema = z.string();

const queryInputSchema = z.object({
	id: z.number(),
});

const queryOutputSchema = z.object({
	id: z.number(),
	title: z.string(),
	description: z.string(),
});

export const queryDemo = publicProcedure
	.input(queryInputSchema)
	.output(queryOutputSchema)
	.query((opts) => {
		const { ctx, input, signal } = opts;

		const request = new QueryRequestDto();
		request.id = Number(opts.input);

		// Code
		//...
		//...

		// throw new TRPCError({
		// 	code: 'NOT_FOUND',
		// 	message: 'Not found',
		// });

		const response: QueryResponseDto = {
			id: 1,
			title: 'typescript',
			description: 'great language',
		};

		return response;
	});
