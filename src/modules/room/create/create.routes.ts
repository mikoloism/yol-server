import { createRouter } from 'libs/router';
import { room_create_new } from './create.handler';

const RoomCreateRoutes = createRouter();

RoomCreateRoutes.post('/', room_create_new);

export { RoomCreateRoutes };
