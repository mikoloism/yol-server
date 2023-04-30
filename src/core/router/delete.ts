function withDelete<Route extends string>(
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
			const [_req, res] = args;
			const expressRouter = (this as any).expressRouter;

			async function callback<T>(this: T, ...args: any[]) {
				try {
					const result = await originalMethod.apply(this, args);
					res.status(200).send(result);
				} catch (error) {
					res.status(500).send({ message: (error as any).message });
				}
			}

			expressRouter.delete(routePath, callback.bind(this));
		};
	};
}

export { withDelete, withDelete as Delete, withDelete as delete };
