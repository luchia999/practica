import { setPostData  } from "./set-post-data";

export const removeCommentAsyncCommentAsync = (requestServer, postId, id) => (dispatch) => {
	requestServer('removePostComment', postId, id).then((postData) => {
		dispatch(setPostData(postData.res));
	});
};
