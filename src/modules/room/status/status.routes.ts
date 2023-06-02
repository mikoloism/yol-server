import { createRouter } from 'libs/router';
import { ROOM_STATUS_GET_ENDPOINT } from './status.constants';
import * as handlers from './status.handler';

const RoomStatusRoutes = createRouter();

RoomStatusRoutes.get(ROOM_STATUS_GET_ENDPOINT, handlers.room_status_get);

export { RoomStatusRoutes };
