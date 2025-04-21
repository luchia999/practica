import { ACTION_TYPE } from "../actions";

const initialPostState = {
	id: '',
	title: '',
	imageUrl: '',
	content: '',
	publishedAt: '',
	comments: [],
};

export const postReducer = (stste = initialPostState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_POST_DATA:
			return {
				...stste,
				...action.payload,
			};
       default:
		  return stste;
	}
};
