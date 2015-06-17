CommentSubmit = React.createClass({
    submitComment (event) {
        event.preventDefault();
        this.props.onCommentSubmit(event.target.body.value);
        event.target.body.value = "";
    },
    render () {
        return (
            <div>
                <form name="comment" className="comment-form form" onSubmit={this.submitComment}>
                    <div className="form-group ">
                        <div className="controls">
                            <label >Comment on this post</label>
                            <textarea name="body" id="body" className="form-control" rows="3"></textarea>
                            <span className="help-block"></span>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Add Comment</button>
                </form>
            </div>
        )
    }
});