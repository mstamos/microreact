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
    mixins: [MeteorDataMixin],
    trackMeteorData (props, state) {
        return {
            postData: Posts.findOne({_id:this.props._id})
        }
    },
    handleInputChange ( prop, val) {
        var stateOb = {
            urlValue : val
        };
        if (prop === "title") {
            stateOb = {
                titleValue : val
            };
        }
        this.setState(stateOb);
    },
    // This functions deletes the post and redirect the user into postsList page
    deletePost (event) {
        event.preventDefault();
        if (confirm("Delete this post?")) {
            Posts.remove(this.props._id);
            FlowRouter.go('postsList');
        }
    },
    render () {
        if (this.data.postData ) {
            return (
                <form className="main form page" onSubmit={this.formSubmition}>
                    <PostInput
                        title={"Title"}
                        placeholder={"Name your post"}
                        errorClassName={this.state.errorsTitleClass}
                        errorMessage={this.state.errorsTitle}
                        onInputChange={this.handleInputChange.bind(null, "title")}
                        value={this.data.postData.title}
                        />
                    <PostInput
                        title={"URL"}
                        placeholder={"Your URL"}
                        errorClassName={this.state.errorsUrlClass}
                        errorMessage={this.state.errorsUrl}
                        onInputChange={this.handleInputChange.bind(null, "url")}
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