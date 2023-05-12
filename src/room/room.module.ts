import type { AppModule } from '@/app.interface';
import { prefix, router } from './room.router';

export class RoomModule {
	public static inject(app: AppModule) {
		app.app.use(prefix, router);
	}
}
