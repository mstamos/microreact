/**
 * This component renders a list of posts. Get all post and for each of them pass
 * the props in PostItem decodeURIComponent
 *
 * Render
 *      PostItem
 */
PostList = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData () {
        return {
            allPosts: Posts.find().fetch()
        }
    },
    render () {
        // Iterate through all posts and create a post item for each of them
        let posts = this.data.allPosts.map(function (post) {
            return <PostItem
                key={post._id}
                _id={post._id}
                title={post.title}
                url={post.url}
                author={post.author}
                commentsCount={post.commentsCount}
                />
        });
        return (
            <div className="posts page">
                {posts}
            </div>
        )
    }
});

