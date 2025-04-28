import { generateDate } from '../utils';
	export const addPost = ({imageUrl, title,comment }) =>

		fetch('http://localhost:3005/posts', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			image_url: imageUrl,
			published_at: generateDate(),
			title,
			comment,
		 }),
	 }).then((createdPost) => createdPost.json());

