import { createRouter } from 'libs/router';
import * as handler from './ping.handler';

const PingRoutes = createRouter();

PingRoutes.get('', handler.get_ping_request);

export { PingRoutes };
