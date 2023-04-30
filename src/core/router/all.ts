function withAll<Route extends string>(
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

			expressRouter.all(routePath, callback.bind(this));
		};
	};
}

export { withAll, withAll as All, withAll as all };
