/**
 * This componet renders the post edit page
 * Renders
 *          PostInput   Component   An input component
 *          Input       Html Tag    The submit button
 *          Link        Html Tag    A button to delete the post
 *          */
PostEdit = React.createClass({
    getInitialState () {
        return {
            errorsTitle: "",
            errorsTitleClass: "",
            errorsUrl: "",
            errorsUrlClass: ""
        }
    },
    mixins: [ReactMeteorData],
    getMeteorData () {
        return {
            postData: Posts.findOne({_id:this.props._id})
        }
    },
    // This functions deletes the post and redirect the user into postsList page
    deletePost (event) {
        event.preventDefault();
        if (confirm("Delete this post?")) {
            Posts.remove(this.props._id);
            FlowRouter.go('postsList');
        }
    },
    formSubmission (event) {
        event.preventDefault();
        // We get the values from inputs
        var post = {
            url: event.target.url.value,
            title: event.target.title.value
        };
        // We check if all inputs have values
        var fieldsErrors = validatePost(post);
        // If we didn't fill any of the inputs then we return a message and an error class
        if (!_.isEmpty(fieldsErrors)) {
            if (fieldsErrors.title) {
                this.setState({
                    errorsTitle: fieldsErrors.title,
                    errorsTitleClass: "has-error"
                });
            } else {
                this.setState({
                    errorsTitle: "",
                    errorsTitleClass: ""
                });
            }
            if (fieldsErrors.url) {
                this.setState({
                    errorsUrl: fieldsErrors.url,
                    errorsUrlClass: "has-error"
                });
            } else {
                this.setState({
                    errorsUrl: "",
                    errorsUrlClass: ""
                });
            }
            return;
        }
        let postId = this.props._id
        Posts.update(postId, {$set: post}, function (error) {
            if (error) {
                // display the error to the user
                throwError(error.reason);
            } else {
                FlowRouter.go(`/posts/${ postId }`);
            }
        })
    },
    render () {
        if (this.data.postData ) {
            return (
                <form className="main form page" onSubmit={(e) => this.formSubmission(e)}>
                    <PostInput
                        title={"Title"}
                        placeholder={"Name your post"}
                        errorClassName={this.state.errorsTitleClass}
                        errorMessage={this.state.errorsTitle}
                        value={this.data.postData.title}
                        />
                    <PostInput
                        title={"URL"}
                        placeholder={"Your URL"}
                        errorClassName={this.state.errorsUrlClass}
                        errorMessage={this.state.errorsUrl}
                        value={this.data.postData.url }
                        />
                    <input type="submit" value="Submit" className="btn btn-primary"/>
                    <hr/>
                    <a className="btn btn-danger delete" href="#" onClick={this.deletePost}>Delete post</a>
                </form>
            )
        } else {
            return (
                <div>
                    <Loading/>
                </div>
            )
        }

    }
});