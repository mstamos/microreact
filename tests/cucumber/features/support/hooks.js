(function () {

    'use strict';

    module.exports = function () {
        this.Before(function (callback) {
            // This code runs before every scenario
            this.server.call("removePosts");
            this.server.call("addInitialPosts");
            this.server.call('addUser', {email: "miltos@example.com"}).then(callback);
        });
    };

})();