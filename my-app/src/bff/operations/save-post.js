import { updatePost  } from "../api";
import { sessions } from "../sessions";
import { ROLE } from "../constants";

export const savePost = async (hash, nevPostData) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error:'Доступ запрещен',
			res: null,
		};
	 }

    const updatedPost = await updatePost(nevPostData);


	return {
		error: null,
		res: updatedPost,
   };
};
