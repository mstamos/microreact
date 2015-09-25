(function () {

    'use strict';

    module.exports = function () {
        this.Before(function () {
            // This code runs before every scenario
            server.call("removePosts");
            server.call("addInitialPosts");
            server.call('addUser', {email: "miltos@example.com"});
        });
    };

})();