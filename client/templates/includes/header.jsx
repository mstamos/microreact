Header = React.createClass({
    mixins: [MeteorDataMixin],
    componentDidMount() {
        // insert Blaze login buttons, see this if you do this a lot
        // https://gist.github.com/emdagon/944472f39b58875045b6
        var div = document.getElementById('loginContainer');
        Blaze.renderWithData(Template.loginButtons, {align: 'right'}, div);
    },
    trackMeteorData(props, state) {
        // This method knows how to listen to Meteor's reactive data sources,
        // Here we change userIsLoggedIn to prevent users to see on the header the Submit Post link
        return {
            userIsLoggedIn: Meteor.userId()
        }
    },
    render () {
        return (
            <div>
                <nav className="navbar navbar-default" role="navigation">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                    data-target="#navigation">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="/">Microscope</a>
                        </div>
                        <div className="collapse navbar-collapse" id="navigation">
                            <ul className="nav navbar-nav">
                                {this.data.userIsLoggedIn ? <li><a href="/submit">Submit Post</a></li> : ''}
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <div id="loginContainer" />
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
});

$(document).ready(function () {
    React.render(<Header />, document.getElementById("header-section"));
});