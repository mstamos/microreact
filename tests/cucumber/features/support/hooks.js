(function () {

    'use strict';

    module.exports = function () {

        this.Before(function (callback) {
            console.log('running!');
            this.server.call('addUser', {email: "miltos@example.com"}).then(callback);
        });

    };

})();