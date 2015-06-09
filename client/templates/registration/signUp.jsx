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
        console.log(username);
        if (!this.props.isEmail(username)){
            throw new Meteor.Error(406,TAPi18n.__('not_an_email'));
        }
        this.setState({
            username: username
        })
    },
    saveEmail (email) {
        console.log(email);

        this.setState({
            email: email
        })
    },
    savePassword (password) {
        console.log(password);
        this.setState({
            username: password
        })
    },
    createUser (event) {
        event.preventDefault();

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
                />
                <RegistrationInput
                    defaultValue = {this.state.password}
                    label={"Password"}
                    placeholder={"Your password"}
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
    render: function() {
        switch(this.state.step) {
            case 1:
                return <SignUp
                        isEmail={this.isEmail}
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