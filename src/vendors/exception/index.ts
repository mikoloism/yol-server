function withError() {
	return function decorator<T extends Constructor<Error>>(constructor: T) {
		return class Exception extends constructor {
			constructor(...args: any[]) {
				super(generateMessage(constructor.name, args[0]));
				this.name = constructor.name;
			}
		};
	};
}

function generateMessage(name: string, message: string) {
	return [
		`\n\n`,
		`[> ${name} <]`,
		` :: ${message}. `,
		`(${new Date().toISOString()})`,
		`\n`,
		`-`.repeat(32),
		`\n\n`,
	].join('');
}

type Constructor<T = {}> = new (...args: any[]) => T;

export default withError;
export { generateMessage };
