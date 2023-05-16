import { Entity, Schema } from 'redis-om';

export class RoomEntity extends Entity {}

export const RoomSchema = new Schema(RoomEntity, {
	room_name: { type: 'string' },
	created_at: { type: 'string' },
	visibility: { type: 'string' },
});

export interface RoomBody {
	room_name: string;
	created_at: string;
	visibility: 'public' | 'private' | 'protected';
}
