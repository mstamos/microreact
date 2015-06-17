/**
 * This component render a post item.
 * Props
 *      title           String      Post's Title
 *      url             String      Post's Url
 *      author          String      Post's author
 *      commentCount    Number      Number of comments in the post
 */
PostItem = React.createClass({
    //We check the props
    propTypes: {
        title: React.PropTypes.string.isRequired,
        url: React.PropTypes.string.isRequired,
        author: React.PropTypes.string.isRequired,
        commentsCount: React.PropTypes.number.isRequired
    },
    //This function get a url and return the domain
    getDomain (url) {
        let a = document.createElement('a');
        a.href = url;
        return a.hostname;
    },
    showPost (event) {
        event.preventDefault();
        FlowRouter.go(`/posts/${ this.props._id }`);
    },
    render () {
        return (
            <div className="post">
                <div className="post-content">
                    <h3><a href={this.props.url}>{this.props.title}</a><span>{this.getDomain(this.props.url)}</span>
                    </h3>

                    <p>
                        submitted by {this.props.author},
                        <a href=""> {this.props.commentsCount} comments</a>
                    </p>
                </div>
                <a href="" className="discuss btn btn-default" onClick={this.showPost}>Discuss</a>
            </div>
        );
    }
});