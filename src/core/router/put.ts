function withPut<Route extends string>(
	route: Route = '' as Route,
): MethodDecorator {
	const routePath = route.startsWith('/') ? route : `/${route}`;

	return function decorator(
		_target: any,
		_property: string | symbol,
		descriptor: PropertyDescriptor,
	): void {
		const originalMethod = descriptor.value;

		descriptor.value = function (...args: any[]) {
			const [_, res] = args;
			const expressRouter = (this as any).expressRouter;

			async function callback<T>(this: T, ...args: any[]) {
				try {
					const result = await originalMethod.apply(this, args);
					res.status(200).send(result);
				} catch (error) {
					res.status(500).send({ message: (error as any).message });
				}
			}

			expressRouter.put(routePath, callback.bind(this));
		};
	};
}

export { withPut, withPut as Put, withPut as put };
