import { sessions } from "../sessions";

export const logout =
	async (usesession) => {
		sessions.remove(usesession);
	};
