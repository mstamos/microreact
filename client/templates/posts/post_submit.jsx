const PostInput = React.createClass({
    render () {
        const errorClassName = "form-group " + this.props.errorclassName;
        return (
            <div className={errorClassName}>
                <label className="control-label" for={this.props.title.toLowerCase()}>{this.props.title}</label>
                <div className="controls">
                    <input name={this.props.title.toLowerCase()} id={this.props.title.toLowerCase()} type="text" value="" placeholder={this.props.placeholder} className="form-control"/>
                    <span className="help-block">{this.props.errorMessage}</span>
                </div>
            </div>
        );
    }
});
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