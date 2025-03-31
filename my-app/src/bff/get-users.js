export const getUsers = async() =>
	fetch('http://localhost:3005/users').then((loadedUsers) => loadedUsers.json());
