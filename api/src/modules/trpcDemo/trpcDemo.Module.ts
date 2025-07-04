import { router } from '@/config/trpc';
import { mutationDemo } from './apps/features/v1/mutationDemo/procedure';
import { queryDemo } from './apps/features/v1/queryDemo';

export const trpcDemoModule = router({
	v1_demo: {
		mutation_demo: mutationDemo,
		query_demo: queryDemo,
	},
});
