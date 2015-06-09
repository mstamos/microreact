const RegistrationInput = React.createClass({
    getValue (event) {
        event.preventDefault();
        this.props.getInputValue(
          this.refs.regInput.getDOMNode().value
        );
    },
    render () {
        return (
            <div>
                <label>{this.props.label}</label>
                <input type="text" ref="regInput" onChange={this.getValue} value={this.props.defaultValue} placeholder={this.props.placeholder}/>
            </div>
        );
    }

});

SignUp = React.createClass({
    getInitialState () {
      return {
              username: '',
              email: '',
              password: ''
      }
    },
    saveUsername (username) {
        this.setState({
            username: username
        })
    },
    saveEmail (email) {
        this.setState({
            email: email
        })
    },
    savePassword (password) {
        this.setState({
            password: password
        })
    },
    createUser (event) {
        event.preventDefault();
        console.log(this.state);
        Meteor.call("methods", this.state.username, function (error, result) {
            if(!error) {
                if (result) {
                    throw new Meteor.Error(406, TAPi18n.__("user_exist"));
                }
            }
        });
        //if(!this.props.isEmail(this.state.email)) {
        //    throw new Meteor.Error(406, TAPi18n.__("not_valid_email"));
        //}
        if(!this.props.isValidPassword(this.state.password)) {
            throw new Meteor.Error(406, TAPi18n.__("not_valid_password"));
        }
        var userData= this.state;
        var userData = _.extend(userData, {
            profile:{

            }
        });
        console.log(userData);
        Meteor.call("registerUser", userData, function (error, result) {
            if (!error) {
                console.log("Welcome abord");
            } else {
                console.log("Something went wrong");
            }
        })

    },
    render () {
        return (
            <div>
                <RegistrationInput
                    defaultValue = {this.state.username}
                    label={"Username"}
                    placeholder={"Your username"}
                    getInputValue={this.saveUsername}
                />
                <RegistrationInput
                    defaultValue = {this.state.email}
                    label={"Email"}
                    placeholder={"Your email"}
                    getInputValue={this.saveEmail}

                    />
                <RegistrationInput
                    defaultValue = {this.state.password}
                    label={"Password"}
                    placeholder={"Your password"}
                    getInputValue={this.savePassword}

                    />
                <button onClick={this.createUser}>Sign Up</button>
            </div>
        );
    }
});

Registration = React.createClass({
    getInitialState: function() {
        return {
            step : 1
        }
    },
    isEmail (value) {
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (filter.test(value)) {
            return true;
        }
        console.log('Please enter a valid email address.');
        return false;
    },
    isValidPassword (password) {
        if (password.length < 6) {
            console.log('Your password should be 6 characters or longer.');
            return false;
        }
        return true;
    },
    render () {
        switch(this.state.step) {
            case 1:
                return <SignUp
                        isEmail={this.isEmail}
                        isValidPassword={this.isValidPassword}
                    />
            case 2:
                return <SurveyFields />
            case 3:
                return <Confirmation />
            case 4:
                return <Success />
        }
    }
});