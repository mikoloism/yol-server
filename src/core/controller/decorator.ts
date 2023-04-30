import { Router as createRouter } from 'express';

function withController<Route>(baseRoute: Route) {
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
	};
}

export {
	withController,
	withController as controller,
	// withController as Controller,
};
