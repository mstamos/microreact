Meteor.methods({
    "usernameExists": function (username) {
        var userExists = Meteor.users.findOne({username:username});
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
        return Accounts.createUser(
            userData)
            //,
            //function (err, result) {
            //    if (err) {
            //        if (err.message === 'Email already exists. [403]') {
            //            console.log('We are sorry but this email is already used.');
            //        } else {
            //            console.log('We are sorry but something went wrong.');
            //        }
            //        throw (err);
            //    } else {
            //        console.log('Congrats new Meteorite, you\'re in!');
            //    }
            //});
    }
});
