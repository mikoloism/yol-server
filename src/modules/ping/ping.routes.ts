import { createRouter } from 'libs/router';
import { PING_GET_ENDPOINT } from './ping.constants';
import * as handler from './ping.handler';

const PingRoutes = createRouter();

PingRoutes.get(PING_GET_ENDPOINT, handler.get_ping_request);

export { PingRoutes };
