export class UserService {
	public static async joinUser(room_name: string, username: string) {
		// find username
		return { username, room_name };
	}

	public static async findByUsername(username: string): Promise<null> {
		return username && null;
	}

	public static async findByUserId(userId: string): Promise<null> {
		return userId && null;
	}
}
