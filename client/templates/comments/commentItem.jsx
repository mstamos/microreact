CommentItem = React.createClass({
    render () {
        return (
            <div>
                <li>
                    <h4>
                        <span className="author">{this.props.author}</span>
                        <span className="date"> on {this.props.submittedText.toString()}</span>
                    </h4>
                    <p>{this.props.body}</p>
                </li>
            </div>
        )
    }
});