import { Router as createRouter } from 'express';
import Server from 'core/server';

function withController<Route>(baseRoute: Route) {
	const server = Server.new();

	return function decorator(constructor: any) {
		Object.defineProperty(constructor.prototype, 'expressRouter', {
			value: createRouter(),
			writable: true,
			enumerable: true,
			configurable: true,
		});

		Object.defineProperty(constructor.prototype, 'baseRoute', {
			value: baseRoute,
			writable: true,
			enumerable: true,
			configurable: true,
		});

		server.register(constructor);
	};
}

export {
	withController,
	withController as controller,
	// withController as Controller,
};
