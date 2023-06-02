import { createRouter } from 'libs/router';
import { ROOM_DELETE_ENDPOINT } from './delete.constants';
import * as handler from './delete.handler';

const RoomDeleteRoutes = createRouter();

RoomDeleteRoutes.delete(ROOM_DELETE_ENDPOINT, handler.room_delete);

export { RoomDeleteRoutes };
