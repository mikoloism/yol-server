import { controller } from 'core/controller';
import * as api from 'core/router';

@controller('/@')
export default class PageController {
	@api.get(':page')
	async send_page() {
		throw new Error('Endpoint not Implemented!');
	}

	@api.post('/:page')
	async create_new_page() {
		throw new Error('Endpoint not Implemented!');
	}
}

@controller('/ping')
export class PingController {
	@api.get('')
	async response_pong() {
		console.log('server done by PING:PONG');
		return 'pong';
	}
}
