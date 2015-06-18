const SIGN_IN_NUMBER = 1;
const SIGN_UP_NUMBER = 2;
/**
 * This component renders a Sign Up section.
 */
const SignUp = React.createClass({
    // This method gets the data from the inputs and make the appropriate checks.
    // After that creates a new user and logged in him and redirect him at post list page
    createUser (event) {
        event.preventDefault();
        var userData = {
            username: this.refs.username.getDOMNode().value,
            password: this.refs.password.getDOMNode().value,
            email: this.refs.email.getDOMNode().value,
        }
        Meteor.call("methods", userData.username, function (error, result) {
            if (!error) {
                if (result) {
                    throw new Meteor.Error(406, TAPi18n.__("user_exist"));
                }
            }
        });
        if (!Authentication.isEmail(userData.email)) {
            throw new Meteor.Error(406, TAPi18n.__("not_valid_email"));
        }
        if (!Authentication.isValidPassword(userData.password)) {
            throw new Meteor.Error(406, TAPi18n.__("not_valid_password"));
        }
        Meteor.call("registerUser", userData, function (error, result) {
            if (!error) {
                console.log("Welcome abord");
                Meteor.loginWithPassword(userData.username, userData.password, function (error) {
                    if (error) {
                        console.log(error.message);
                    } else {
                        // We go to the previous page
                        window.history.back();
                    }
                })
            } else {
                console.log("Something went wrong");
                console.log(error.message);
            }
        })
    },
    cancelRegister (event) {
        event.preventDefault();
        this.props.onUserClick(SIGN_IN_NUMBER);
    },
    render () {
        return (
            <form className="main form page">
                <div className="form-group">
                    <input type="text" ref="username" placeholder="Username" className="form-control"/>
                </div>
                <div className="form-group">
                    <input type="password" ref="password" placeholder="Password" className="form-control"/>
                </div>
                <div className="form-group">
                    <input type="email" ref="email" placeholder="Email" className="form-control"/>
                </div>
                <button className="btn btn-primary" onClick={this.createUser}>Sign Up</button>
                <div className="divider"/>
                <button className="btn btn-primary" onClick={this.cancelRegister}>Cancel</button>
            </form>
        );
    }
});

/**
 * This component renders a Sign In form. Get the values from inputs and login user.
 * After the success on login redirect user at post list page.
 */
const SignIn = React.createClass({
    register (event) {
        event.preventDefault();
        this.props.onUserClick(SIGN_UP_NUMBER);
    },
    // Get the values from the inputs and login user.
    signInUser (event) {
        event.preventDefault();
        const userData = {
            username: this.refs.username.getDOMNode().value,
            password: this.refs.password.getDOMNode().value
        };
        Meteor.loginWithPassword(userData.username, userData.password, function (err, result) {
            if (err) {
                console.log(err.message);
            } else {
                // We go to the previous page
                window.history.back();

            }
        });
    },
    render()  {
        return (
            <form className="main form page">
                <div className="form-group">
                    <input type="text" ref="username" placeholder="Username" className="form-control"/>
                </div>
                <div className="form-group">
                    <input type="password" ref="password" placeholder="Password" className="form-control"/>
                </div>

                <button className="btn btn-primary" onClick={this.signInUser}>Sing In</button>
                <div className="divider"/>
                <button className="btn btn-primary" onClick={this.register}>Resigster</button>
            </form>
        )
    }
});

/**
 * In this component we change between SignIn and SignUp components.
 */
Registration = React.createClass({
    getInitialState () {
        return {
            registrationViews: 1
        }
    },
    onChangeViews (numberOfView) {
        this.setState({
            registrationViews: numberOfView
        });
    },
    render () {
        switch (this.state.registrationViews) {
            case 1:
                return <SignIn
                    onUserClick={this.onChangeViews}
                    />
            case 2:
                return <SignUp
                    onUserClick={this.onChangeViews}
                    />
        }
    }
});


