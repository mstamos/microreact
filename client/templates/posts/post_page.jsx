/**
 * This component renders the post page.
 * Render
 *          PostItem
 *          CommentItem         A list of comments
 *          CommentSubmit       A component to submit new comment
 * Props
 *          _id     String  Post's id
 */
PostPage = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData () {
        return {
            postData: this.getData(),
            comments: Comments.find({postId: this.props._id}),
            userIsLogged: Meteor.userId()
        }
    },
    getData () {
        if (FlowRouter.subsReady()) {
            return Posts.findOne();
        } else {
            return "Loading..."
        }
    },
    submitComment (commentText) {
        let comment = {
            body: commentText,
            postId: this.props._id
        };
        let errors = {};
        if (!comment.body) {
            errors.body = "Please write some content";
            return Session.set('commentSubmitErrors', errors);
        }
        Meteor.call('commentInsert', comment, function (error, commentId) {
            if (error) {
                throwError(error.reason);
            }
        });
    },
    render () {
        let post = this.data.postData;
        if (FlowRouter.subsReady()) {
            let renderedComments = this.data.comments.map(function (comment) {
                return <CommentItem
                    key={comment._id}
                    body={comment.body}
                    author={comment.author}
                    submittedText={comment.submitted}
                    />
            });
            return (
                <div className="post-page page">
                    <PostItem
                        key={post._id}
                        _id={post._id}
                        title={post.title}
                        url={post.url}
                        author={post.author}
                        commentsCount={post.commentsCount}
                        />
                    <ul className="comments">
                        {renderedComments}
                    </ul>
                    {this.data.userIsLogged ?
                        <CommentSubmit
                            onCommentSubmit={this.submitComment}/> :
                        <p id="login-leave-comment">Please log in to leave a comment.</p>
                    }
                </div>
            );
        } else {
            return (
                <div>
                    <Loading/>
                </div>
            )
        }

    }
});