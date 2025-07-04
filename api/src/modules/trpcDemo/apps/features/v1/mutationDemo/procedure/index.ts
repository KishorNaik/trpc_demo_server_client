import { publicProcedure } from '@/config/trpc';
import { z } from 'zod';
import { MutationRequestDto, MutationResponseDto } from '../contracts';
import { TRPCError } from '@trpc/server';

/*
  CREATE
  UPDATE
  DELETE
*/

/*
curl --location 'http://localhost:3000/trpc/v1_demo.mutation_demo' \
--header 'Content-Type: application/json' \
--data '{
    "title":"typescript",
    "description":"great language"
}'
*/

const mutationInputSchema = z.object({
	title: z.string().min(2),
	description: z.string().min(1),
});

const mutationOutputSchema = z.object({
	message: z.string(),
});

export const mutationDemo = publicProcedure
	.input(mutationInputSchema)
	.output(mutationOutputSchema)
	.mutation((opts) => {
		const { ctx, input, signal } = opts;
		const { title, description } = input;
		const request = new MutationRequestDto();
		request.title = title;
		request.description = description;

		// Code
		//...
		//...

		// throw new TRPCError({
		//   code: "NOT_FOUND",
		//   message: "Not found",
		// })

		const response: MutationResponseDto = {
			message: 'success',
		};

		return response;
	});
