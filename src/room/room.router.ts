import { Router } from 'express';
import { RoomController } from './room.controller';

export const router = Router();
export const prefix = '/api';

router.post('/room', RoomController.create_room);
router.delete('/room/:room_name', RoomController.remove_room);
