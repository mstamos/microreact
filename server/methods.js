Meteor.methods({
    //We check if the username already exists
    "usernameExists": function (username) {
        var userExists = Meteor.users.findOne({username: username});
        if (!_.isEmpty(userExists)) {
            return true
        }
        return false;
    },
    "emailExists": function (email) {
        var emailExists = Meteor.users.findOne({'emails.address': email});
        if (!_.isEmpty(emailExists)) {
            return true;
        }
        return false;
    },
    "registerUser": function (userData) {
        check(userdata, {
            username: String,
            password: String,
            email: String
        });
        if (_.isEmpty(userdata.username) || _.isEmpty(userData.email || _.isEmpty(userData.password))) {
            throw new Meteor.Error(401,TAPi18n.__("not_empty"));
        }
        return Accounts.createUser(
            userData)

    }
});
