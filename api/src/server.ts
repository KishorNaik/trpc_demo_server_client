import { App } from '@/app';
import { ValidateEnv, runNodeCluster } from '@kishornaik/utils';
import { trpcModulesFederation, restApiModulesFederation } from './modules/app.Module';
import { bullMqRunner } from './shared/utils/helpers/bullMq';
import { rabbitMQRunner } from './shared/utils/helpers/rabbitmq';
import { kafkaRunner } from './shared/utils/helpers/kafka';
import { pusherRunner } from './shared/utils/helpers/pusher';

ValidateEnv();

const setDatabase = (): Promise<void> => {
	// Set Database Here
	return Promise.resolve();
};

const runServer = () => {
	new App()
		.initializeRestApiRoutes([...restApiModulesFederation])
		.initializeTrpcRoutes(trpcModulesFederation)
		.initializeDatabase(setDatabase)
		.runBullMqWorker(bullMqRunner)
		.runRabbitMqWorker(rabbitMQRunner)
		.runKafkaWorker(kafkaRunner)
		.runPusherWorker(pusherRunner)
		.initializeErrorHandling()
		.listen();
};

const env = process.env.NODE_ENV || 'development';
if (env === 'development') {
	// For Single Core Server : Development Server Only
	runServer();
} else {
	// For Multi Core Server : Production Server Only
	runNodeCluster(() => {
		runServer();
	});
}
