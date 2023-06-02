declare namespace NodeJS {
	export interface ProcessEnv {
		/* LIARA REDIS ENV VARIABLES */
		readonly LIARA_REDIS_PUBLIC_NETWORK_HOST: string;
		readonly LIARA_REDIS_PUBLIC_NETWORK_PORT: string;
		readonly LIARA_REDIS_PASSWORD: string;
		readonly LIARA_REDIS_URL: string;

		/* UPSTASH REDIS EVN VARIABLES */
		readonly UPSTASH_REDIS_REST_URL: string;
		readonly UPSTASH_REDIS_REST_TOKEN: string;
		readonly REDIS_DATABASE_NAME: string;
		readonly REDIS_DATABASE_ID: string;
		readonly REDIS_REGION: string;
		readonly REDIS_ENDPOINT: string;
		readonly REDIS_PASSWORD: string;
		readonly REDIS_PORT: string;
		readonly REDIS_URL: string;
	}
}
