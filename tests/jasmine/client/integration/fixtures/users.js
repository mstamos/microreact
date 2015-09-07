// We add a new user
Meteor.startup(function() {
    if (Meteor.users.find().count() == 0) {
        var users = [
            {name:"Miltos",email:"miltos@example.com",roles:[], password: "passpass"},
        ];
        _.each(users, function (user) {
            var id = Accounts.createUser({
                email: user.email,
                password: user.password,
                profile: { name: user.name }
            });
        });
    };
});