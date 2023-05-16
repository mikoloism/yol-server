declare namespace NodeJS {
	export interface ProcessEnv {
		REDIS_PUBLIC_NETWORK_HOST: string;
		REDIS_PUBLIC_NETWORK_PORT: string;
		REDIS_PASSWORD: string;
		REDIS_URL: string;
	}
}
