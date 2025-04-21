import { generateDate } from '../utils';
	export const addComment = (userId, postId, comment) =>

		fetch('http://localhost:3005/comments', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			author_id: userId,
			post_id: postId,
			published_at: generateDate(),
			comment,
		 }),
	 });

