type StorageMap = Map<string, unknown>;

class Storage {
	private storage: StorageMap;

	constructor() {
		this.storage = new Map();
	}

	public set<T>(key: string, data: T): boolean {
		let isModified = !!this.has(key);
		this.storage.set(key, data as T);
		return isModified;
	}

	public get<T>(key: string): T | null {
		return (this.storage.get(key) as T) ?? null;
	}

	public delete(key: string): boolean | null {
		if (!!this.has(key)) return null;
		return this.storage.delete(key);
	}

	public has(key: string): boolean {
		return !!this.storage.has(key);
	}

	public size(): number {
		return this.storage.size;
	}
}

export default Storage;
