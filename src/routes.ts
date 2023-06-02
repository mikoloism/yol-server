import { PING_ROUTES_ENDPOINT, PingRoutes } from '@/modules/ping';
import { ROOM_ROUTES_ENDPOINT, RoomRoutes } from '@/modules/room';
import { createRouter } from 'libs/router';

const routes = createRouter();

routes.use(PING_ROUTES_ENDPOINT, PingRoutes);
routes.use(ROOM_ROUTES_ENDPOINT, RoomRoutes);

export { routes };
