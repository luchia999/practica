import { useEffect, useState } from "react";
import { Pagination, PostCard } from "./components";
import { useServerRequest } from "../../hooks";
import { PAGINATION_LIMIT } from "../../constants";
import { getLastPadeFromLinks } from "./utils";
import styled from "styled-components";

const MainContainer = ({className}) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPade, setLastPage] = useState(1);
	const requestServer = useServerRequest();

	useEffect(() => {
		requestServer('fetchPosts', page, PAGINATION_LIMIT).then( ({ res:{ posts, links } }) => {
            setPosts(posts);
			setLastPage(getLastPadeFromLinks(links));
		});
	}, [requestServer, page]);

	return (
        <div className={className}>
			<div className="post-list">
			{posts.map(({ id, title,imageUrl, publishedAt, commentsCount}) => (<PostCard
		   key={id}
		   id={id}
		   title={title}
		   imageUrl={imageUrl}
		   publishedAt={publishedAt}
		   commentsCount={commentsCount}
			/>
		 ))}
		</div>
		{lastPade > 1 && <Pagination page={page} lastPade={lastPade} setPage={setPage} />}
	  </div>
	);
};

export const Main = styled(MainContainer)`
   & .post-list {
       display: flex;
	   flex-wrap: wrap;
	   padding: 20px;
   }
`;
