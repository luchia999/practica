import { useDispatch } from "react-redux";
import { Icon } from "../../../../../../components";
import {openModal, CLOSE_MODAL, removeCommentAsync } from "../../../../../../actions";
import { useServerRequest } from "../../../../../../hooks";
import styled from "styled-components";

const CommentContainer = ({ className, postId, id,  author, content, publishedAt }) => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest ();

	const onCommentRemove = (id) => {
		dispatch(
			openModal({
           text: 'Удалить комментарий?',
		   onConfirm: () => {
			dispatch(removeCommentAsync(requestServer,postId,  id));
		    dispatch(CLOSE_MODAL)
		},
		   onCancel: () => dispatch(CLOSE_MODAL),
		}),
	);
};

	return (
		<div className={className}>
		  <div className="comment">
		  <div className="information-panel">
		     <div className="author">
			   <Icon
				  id="fa-user-circle-o"
				  margin='0 10px 0 0'
				  size='18px'
				  onClick={() => {}}
			/>
			{author}
			</div>
		   <div className="published-at">
			<Icon
				id="fa-calendar-o"
				margin='0 10px 0 0'
				size='18px'
				onClick={() => {}}
			 />
			 {publishedAt}
		   </div>
		</div>
		  <div className="comment-rext">{content}</div>
	  </div>
		  <Icon id="fa-trash-o"
			margin='0 0 0 10px'
			size='21px'
			onClick={() => onCommentRemove(id)}
		 />
	  </div>
	);
};

export const Comment = styled(CommentContainer)`
     display: flex;
	 width: 100%;
	 margin-top: 10px;

    & .comment {
	   width: 550px;
	   padding: 5px 10px;
	   border: 1px solid #000;
	}

   & .information-panel {
       display: flex;
	   justify-content: spase-between;
   }

   & .author {
      display: flex;
   }

   & .published-at {
      display: flex;
   }
`;

