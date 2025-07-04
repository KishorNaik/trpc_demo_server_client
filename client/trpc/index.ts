import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { TRPCAppRouter } from './types/TRPCAppRouter'; // TRPC .d.ts file

export const trpc = createTRPCClient<TRPCAppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3001/trpc',
    }),
  ],
});