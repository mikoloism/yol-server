import { createRouter } from 'libs/router';
import { ROOM_CREATE_ROUTES_ENDPOINT } from './create/create.constnats';
import { RoomCreateRoutes } from './create/create.routes';
import { ROOM_DELETE_ROUTES_ENDPOINT } from './delete/delete.constants';
import { RoomDeleteRoutes } from './delete/delete.routes';
import { ROOM_STATUS_ROUTES_ENDPOINT } from './status/status.constants';
import { RoomStatusRoutes } from './status/status.routes';

const RoomRoutes = createRouter();

RoomRoutes.use(ROOM_CREATE_ROUTES_ENDPOINT, RoomCreateRoutes);
RoomRoutes.use(ROOM_STATUS_ROUTES_ENDPOINT, RoomStatusRoutes);
RoomRoutes.use(ROOM_DELETE_ROUTES_ENDPOINT, RoomDeleteRoutes);

export { RoomRoutes };
