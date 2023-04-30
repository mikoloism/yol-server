import Storage from './base';

class CacheStorage<T extends any = any, K extends string = string> {
	private cache: Storage;
	private key: K;
	private initial?: T | null = null;

	public static new<T extends any, K extends string = string>(
		key: K,
		initial: T,
	): CacheStorage<T, K> {
		return new CacheStorage<T, K>(key, initial);
	}

	public constructor(key: K, initial?: T) {
		this.cache = new Storage();
		this.key = key;
		this.initial = initial ?? null;
	}

	public set(data: T) {
		return this.cache.set(this.key, data);
	}

	public get(): T | null {
		return this.cache.get<T>(this.key);
	}

	public isEmpty(): boolean {
		if (
			!this.isAlive() ||
			this.size() === 0 ||
			this.get() === null ||
			this.get() === undefined
		)
			return true;
		return false;
	}

	public isAlive(): boolean {
		return this.cache.has(this.key);
	}

	public destroy(): boolean {
		return !!this.cache.delete(this.key);
	}

	public flush() {
		this.cache.set(this.key, null);
	}

	public size(): number {
		return this.cache.size();
	}
}

export default CacheStorage;
