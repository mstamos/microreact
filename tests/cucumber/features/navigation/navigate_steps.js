( function () {
    'use strict';

    module.exports = function () {

        var url = require('url');

        this.When(/^I navigate to "([^"]*)"$/, function (relativePath) {
            //We get from scenario the path and navigate to it
            return this.client.
                url(url.resolve(process.env.ROOT_URL, relativePath)).
                waitForExist('.app-title');
        });
    }
})()
