/**
 * This component renders a post input form.
 * Props
 *      title           String      The title of the input field
 *      placeholder     String      The placeholder of the input
 *      errorclassName
 *      errorMessage
 */
const PostInput = React.createClass({
    propTypes: {
        title: React.PropTypes.string.isRequired,
        placeholder: React.PropTypes.string.isRequired
    },
    render () {
        const errorClassName = "form-group " + this.props.errorClassName;
        return (
            <div className={errorClassName}>
                <label className="control-label" htmlFor={this.props.title.toLowerCase()}>{this.props.title}</label>

                <div className="controls">
                    <input name={this.props.title.toLowerCase()} id={this.props.title.toLowerCase()} type="text"
                           placeholder={this.props.placeholder} className="form-control"/>
                    <span className="help-block">{this.props.errorMessage}</span>
                </div>
            </div>
        );
    }
});

/**
 * This component renders a form of two input and a button to submit a post
 *
 */
PostSubmit = React.createClass({
    // We set 4 different variables 2 for each input
    // The one is for the message and the other for the css class
    getInitialState () {
      return {
          errorsTitle: "",
          errorsTitleClass: "",
          errorsUrl: "",
          errorsUrlClass: ""
      }
    },
    formSubmition (event) {
        event.preventDefault();
        // Every time form submitting we reset the variables
        this.replaceState(this.getInitialState())
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
            }
            if (fieldsErrors.url) {
                 this.setState({
                    errorsUrl: fieldsErrors.url,
                    errorsUrlClass: "has-error"
                });
            }
            return;
        }
        Meteor.call('postInsert', post, function (error, result) {
            // display the error to the user and abort
            if (error)
                return throwError(error.reason);

            // show this result but route anyway
            if (result.postExists)
                throwError('This link has already been posted');

            FlowRouter.go(`/posts/${ result._id }`);
        });
    },
    render () {
        return (
            <form className="main form page" onSubmit={this.formSubmition}>
                <PostInput
                    title={"Title"}
                    placeholder={"Name your post"}
                    errorClassName= {this.state.errorsTitleClass}
                    errorMessage= {this.state.errorsTitle}
                    />
                <PostInput
                    title={"URL"}
                    placeholder={"Your URL"}
                    errorClassName= {this.state.errorsUrlClass}
                    errorMessage= {this.state.errorsUrl}
                    />
                <input type="submit" value="Submit" className="btn btn-primary"/>
            </form>
        );
    }
});