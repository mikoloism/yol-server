type Constructor =
	| (new (...args: any[]) => any)
	| { new (...args: any[]): any };

let app: null = null;

function withApp<T extends Constructor>(App: T): InstanceType<T> {
	if (app === null) {
		app = new App() satisfies T;
	} else {
		throw new Error();
	}

	return app!;
}

export { withApp as runApp, withApp, withApp as default };
