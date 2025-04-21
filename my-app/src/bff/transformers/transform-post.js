export const transformPost = (dbPost) => ({
    id: dbPost.id,
	title: dbPost.title,
	content: dbPost.content,
	ImageUrl: dbPost.ImageUrl,
	publishedAt: dbPost.published_at,

});
