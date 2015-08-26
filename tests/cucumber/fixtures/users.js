( function () {

    'use strict';

    Meteor.methods({
        addUser: function (opts) {
            Meteor.users.remove({});
            Accounts.createUser({
                email: opts.email,
                password: opts.password ? opts.password : "passpass"
            });
        }
    });

})();