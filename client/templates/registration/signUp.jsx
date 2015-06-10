SignUp = React.createClass({
    createUser (event) {
        event.preventDefault();
        var userData = {
            username     : this.refs.username.getDOMNode().value,
            password : this.refs.password.getDOMNode().value,
            email    : this.refs.email.getDOMNode().value,
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
                        FlowRouter.go("postList");
                    }
                })
            } else {
                console.log("Something went wrong");
                console.log(error.message);
            }
        })
    },
    render () {
        return (
            <div>
                <label>Name</label>
                <input type="text" ref="username"  />

                <label>Password</label>
                <input type="password" ref="password" />

                <label>Email</label>
                <input type="email" ref="email"  />
                <button onClick={this.createUser}>Sign Up</button>
            </div>
        );
    }
});

Registration = React.createClass({
    getInitialState: function () {
        return {
            step: 1
        }
    },
    render () {
        switch (this.state.step) {
            case 1:
                return <SignUp/>
            case 2:
                return <SurveyFields />
            case 3:
                return <Confirmation />
            case 4:
                return <Success />
        }
    }
});


