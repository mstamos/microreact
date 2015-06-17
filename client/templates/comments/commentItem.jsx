/**
 * This component render a comment
 * Props
 *      author          String      Comment's author
 *      submittedText   Date        Comment's submitted date
 *      body            String      Comment's body text
 */
CommentItem = React.createClass({
    //We check the props
    propTypes: {
        author: React.PropTypes.string.isRequired,
        submittedText: React.PropTypes.instanceOf(Date),
        body: React.PropTypes.string.isRequired,
    },
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