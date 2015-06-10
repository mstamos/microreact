Header = React.createClass({
    mixins: [MeteorDataMixin],
    getInitialState: function () {
        return {
            userIsLogged: Meteor.userId()
        }
    },
    trackMeteorData(props, state) {
        // This method knows how to listen to Meteor's reactive data sources,
        // Here we change userIsLoggedIn to prevent users to see on the header the Submit Post link
        return {
            userIsLoggedIn: Meteor.userId()
        }
    },
    // This method called when a user press logout button
    logOut: function (event) {
        event.preventDefault();
        Meteor.logout();
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
                                <li>{this.data.userIsLoggedIn ?
                                    <a href="" onClick={this.logOut}>Sign Out</a> :
                                    <a href="/authentication">Sign In</a>}
                                </li>
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