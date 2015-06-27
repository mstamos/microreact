/**
 * This component renders an error
 * Props
 *      message     String      The message of the error
 */
let Error = React.createClass({
    propsTypes: {
      message: React.PropTypes.string.isRequired
    },
    render () {
        return (
            <div>
                <div className="alert alert-danger" role="alert">
                    <button type="button" className="close" data-dismiss="alert">&times;</button>
                    {this.props.message}
                </div>
            </div>
        )
    }
});

/**
 * This component renders a list of errors
 *
 */
ErrorsList = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData () {
        return {
            errors: Errors.find().fetch()
        }
    },
    render () {
        let appErrors = this.data.errors.map(function (error) {
            return <Error
                key={error._id}
                message={error.message}
                />
        });
        return (
            <div>
                <div className="errors">
                    {appErrors}
                </div>
            </div>
        )
    }
});

$(document).ready(function () {
    React.render(<ErrorsList />, document.getElementById("errors-section"));
});