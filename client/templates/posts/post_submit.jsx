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
        title :  React.PropTypes.string.isRequired,
        placeholder: React.PropTypes.string.isRequired
    },
    render () {
        const errorClassName = "form-group " + this.props.errorclassName;
        return (
            <div className={errorClassName}>
                <label className="control-label" for={this.props.title.toLowerCase()}>{this.props.title}</label>

                <div className="controls">
                    <input name={this.props.title.toLowerCase()} id={this.props.title.toLowerCase()} type="text"
                           value="" placeholder={this.props.placeholder} className="form-control"/>
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
    render () {
        return (
            <form className="main form page">
                <PostInput
                    title={"Title"}
                    placeholder={"Name your post"}
                    />
                <PostInput
                    title={"URL"}
                    placeholder={"Your URL"}
                    />
                <input type="submit" value="Submit" className="btn btn-primary"/>
            </form>
        );
    }
});