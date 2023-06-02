import { response, type Request, type Response } from 'express';

export type StatusGetRequest = Request<{
	readonly room_name: string;
}>;

export type StatusGetResponse = Response<{
	room_name: string;
	is_created: boolean;
	is_public: boolean;
	is_private: boolean;
	is_protected: boolean;
}>;
