export class Chain {
	private _result!: any;
	public constructor(protected callback: Function) {}

	public chian(callback: Function): Chain {
		this._result = callback();
		return new Chain(() => this._result);
	}

	public done() {
		return this._result;
	}
}

function chain(callback: Function): Chain {
	return new Chain(callback);
}

export default chain;
