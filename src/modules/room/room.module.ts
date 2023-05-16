import type { AppModule } from '../../app/app.interface';
import { prefix, router } from './room.router';

export class RoomModule {
	public static inject(app: AppModule) {
		app.apiRouter.use(prefix, router);
	}
}
