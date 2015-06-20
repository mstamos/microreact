Meteor.methods({
    "registerUser": function (userData) {
        check(userData, {
            username: String,
            password: String,
            email: String
        });
        return Accounts.createUser(userData);
    }
});