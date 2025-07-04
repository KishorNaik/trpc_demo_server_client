import { mergeRouters } from '@/config/trpc';
import { trpcDemoModule } from './trpcDemo/trpcDemo.Module';

// REST API
const restApiModulesFederation: Function[] = [];

// TRPC
const trpcModulesFederation = mergeRouters(trpcDemoModule); // comma separated multiple modules
type TRPCAppRouter = typeof trpcModulesFederation;

export { restApiModulesFederation, trpcModulesFederation, TRPCAppRouter };
