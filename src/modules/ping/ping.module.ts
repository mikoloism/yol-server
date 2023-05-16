import type { AppModule } from '../../app/app.interface';
import { prefix, router } from './ping.router';

export class PingModule {
	public static inject(app: AppModule) {
		app.apiRouter.use(prefix, router);
	}
}
