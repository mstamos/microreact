/**
 * This component renders a post input form.
 * Props
 *      title           String      The title of the input field
 *      placeholder     String      The placeholder of the input
 *      errorclassName
 *      errorMessage
 */
PostInput = React.createClass({
    propTypes: {
        title: React.PropTypes.string.isRequired,
        placeholder: React.PropTypes.string.isRequired
    },
    handleChangedValue (event) {
        event.preventDefault();
        this.props.onInputChange(event.target.value)
    },
    render () {
        const errorClassName = "form-group " + this.props.errorClassName;
        return (
            <div className={errorClassName}>
                <label className="control-label" htmlFor={this.props.title.toLowerCase()}>{this.props.title}</label>

                <div className="controls">
                    <input
                        name={this.props.title.toLowerCase()}
                        id={this.props.title.toLowerCase()}
                        type="text"
                        placeholder={this.props.placeholder}
                        value={this.props.value}
                        onChange={this.handleChangedValue}
                        className="form-control"
                        />
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
    mixins: [ReactMeteorData],
    getMeteorData () {
        return {
            userIsLogged: Meteor.userId()
        }
    },
    // We set 4 different variables 2 for each input
    // The one is for the message and the other for the css class
    getInitialState () {
        return {
            errorsTitle: "",
            errorsTitleClass: "",
            errorsUrl: "",
            errorsUrlClass: "",
            titleValue: "",
            urlValue: ""
        }
    },
    formSubmition (event) {
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
    handleInputChange (prop, val) {
        var stateOb = {
            urlValue: val
        };
        if (prop === "title") {
            stateOb = {
                titleValue: val
            };
        }
        this.setState(stateOb);
        console.log(this.state.titleValue);
    },
    render () {
        if (this.data.userIsLogged) {
            return (
                <form className="main form page" onSubmit={this.formSubmition}>
                    <PostInput
                        title={"Title"}
                        placeholder={"Name your post"}
                        errorClassName={this.state.errorsTitleClass}
                        errorMessage={this.state.errorsTitle}
                        onInputChange={this.handleInputChange.bind(null, "title")}
                        value={this.state.titleValue}
                        />
                    <PostInput
                        title={"URL"}
                        placeholder={"Your URL"}
                        errorClassName={this.state.errorsUrlClass}
                        errorMessage={this.state.errorsUrl}
                        onInputChange={this.handleInputChange.bind(null, "url")}
                        value={this.state.urlValue}
                        />
                    <input type="submit" value="Submit" className="btn btn-primary"/>
                </form>
            );
        } else {
            React.render(<AccessDenied/>, document.getElementById("yield-section"));
        }

    }
});