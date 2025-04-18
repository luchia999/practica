import { transformUser } from "../transformers";

export const getUser  = async (loginToFind) =>
	fetch(`http://localhost:3005/users?lohin=${loginToFind}`)
.then((loadedUser) => loadedUser.json())
.then(([loadedUser]) => loadedUser && transformUser(loadedUser));
