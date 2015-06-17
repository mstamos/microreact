//PostItem = React.createClass({
//    mixins: [MeteorDataMixin],
//    trackMeteorData (props, state) {
//        return {
//            postData: this.getPost()
//        }
//    },
//    getSubsState () {
//        return FlowRouter.subsReady();
//    },
//    getPost () {
//        if (this.getSubsState()) {
//             return Posts.findOne({_id:this.props._id});
//        }
//    },
//    //This function get a url and return the domain
//    getDomain (url) {
//        var a = document.createElement('a');
//        a.href = url;
//        return a.hostname;
//    },
//    moveToPost () {
//        event.preventDefault();
//        FlowRouter.go("/posts/"+this.props._id);
//    },
//    render () {
//        let post = this.data.postData;
//         if (this.getSubsState()) {
//            const commentsCounter = Comments.find({postId: this.data.postData._id}).count();
//             console.log(commentsCounter);
//
//            return (
//                <div className="post">
//                    <div className="post-content">
//                        <h3><a href={post.url}>{post.title}</a><span>{this.getDomain(post.url)}</span>
//                        </h3>
//                        <p>
//                            submitted by {post.author},
//                            <a href="">  {commentsCounter} comments</a>
//                        </p>
//                    </div>
//                    <a href="" className="discuss btn btn-default" onClick={this.moveToPost}>Discuss</a>
//                </div>
//            );
//        } else {
//            return( <div>
//                        <Loading/>
//                    </div> )
//        }
//
//    }
//});
/**
 * This component render a post item.
 * Props
 *      title           String      Post's Title
 *      url             String      Post's Url
 *      author          String      Post's author
 *      commentCount    Number      Number of comments in the post
 */
PostItem = React.createClass({
    //We check the props
    propTypes: {
        title: React.PropTypes.string.isRequired,
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
                    <h3><a href={this.props.url}>{this.props.title}</a><span>{this.getDomain(this.props.url)}</span>
                    </h3>

                    <p>
                        submitted by {this.props.author},
                        <a href=""> {this.props.commentsCount} comments</a>
                    </p>
                </div>
                <a href="" className="discuss btn btn-default">Discuss</a>
            </div>
        );
    }
});

/**
 * This component renders a list of posts. Get all post and for each of them pass
 * the props in PostItem decodeURIComponent
 *
 * Render
 *      PostItem
 */
PostList = React.createClass({
    mixins: [MeteorDataMixin],
    trackMeteorData (props, state) {
        return {
            allPosts: Posts.find().fetch()
        }
    },
    render () {
        const posts = this.data.allPosts.map(function (post) {
            //Calculates for each post the number of comments
            const commentsCounter = Comments.find({postId: post._id}).count();
            return <PostItem
                key={post._id}
                title={post.title}
                url={post.url}
                author={post.author}
                commentsCount={commentsCounter}
                />
            //return <PostItem
            //       key={post._id}
            //        _id={post._id}/>
        });
        return (
            <div className="posts page">
                {posts}
            </div>
        )
    }
});

