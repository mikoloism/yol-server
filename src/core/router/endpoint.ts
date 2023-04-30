import HttpMethod from 'core/method.enum';
import type { RouterConfig } from 'features/endpoint';

function withEndpoint<Route extends string>(
	config: RouterConfig<Route>,
): MethodDecorator;
function withEndpoint<Route extends string>(
	method: HttpMethod,
	route: Route,
): MethodDecorator;
function withEndpoint<Route extends string>(
	ConfigOrMethod: RouterConfig<Route> | HttpMethod,
	route?: Route,
): MethodDecorator {
	let self_route: Route = route!;
	let self_method = ConfigOrMethod as HttpMethod;

	if ('route' in (ConfigOrMethod as RouterConfig<Route>)) {
		const config = ConfigOrMethod as RouterConfig<Route>;
		self_method = config.method;
		self_route = config.route as Route;
	}

	const routePath = self_route.startsWith('/')
		? self_route
		: `/${self_route}`;

	return function decorator(
		_target: any,
		_property: string | symbol,
		descriptor: PropertyDescriptor,
	): void {
		const originalMethod = descriptor.value;

		descriptor.value = function (...args: any[]) {
			const [req, res] = args;
			const expressRouter = (this as any).expressRouter;

			async function callback<T>(this: T, ...args: any[]) {
				try {
					const result = await originalMethod.apply(this, args);
					res.status(200).send(result);
				} catch (error) {
					res.status(500).send({ message: (error as any).message });
				}
			}

			expressRouter[self_method].call(null, callback.bind(this));
		};
	};
}

export {
	withEndpoint,
	withEndpoint as endpoint,
	withEndpoint as Endpoint,
	withEndpoint as withRouter,
	withEndpoint as router,
	withEndpoint as Router,
};
