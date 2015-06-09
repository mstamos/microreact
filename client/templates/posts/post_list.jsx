const PostItem = React.createClass({
    //We check the props
    propTypes: {
        title:  React.PropTypes.string.isRequired,
        url: React.PropTypes.string.isRequired,
        author: React.PropTypes.string.isRequired,
        commentsCount: React.PropTypes.number.isRequired
    },
    //This function get a url and return the domain
    getDomain (url) {
        var a = document.createElement('a');
        a.href = url;
        return a.hostname;
    },
    render () {
        return (
            <div className="post">
                <div className="post-content">
                    <h3><a href={this.props.url}>{this.props.title}</a><span>{this.getDomain(this.props.url)}</span></h3>

                    <p>
                        submitted by {this.props.author},
                        <a href="{{pathFor 'postPage'}}">{this.props.commentsCount} comments</a>
                        <a href="">{this.props.commentsCount} comments</a>
                    </p>
                </div>
            </div>
        );
    }
});
PostList = React.createClass({
    mixins: [ReactMeteor.Mixin],
    getMeteorState () {
        return {
            allPosts: Posts.find().fetch()
        }
    },
    calculateCommentsCounter () {

    },
    render () {
        const posts = this.state.allPosts.map( function (post) {
           const commentsCounter = Comments.find({postId: post._id}).count();
           return <PostItem
                        key = {post._id}
                        title = {post.title}
                        url = {post.url}
                        author = {post.author}
                        commentsCount ={commentsCounter}
                    />
        });
        return (
        <div className="posts page">
            {posts}
        </div>
        )
    }
});

