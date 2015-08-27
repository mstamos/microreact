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


        this.When(/^I navigate to submit page$/, function () {
            //We navigate into /submit path
            return this.client.
                url(url.resolve(process.env.ROOT_URL, "/submit")).
                waitForExist('.app-title');
        });

        this.Then(/^I should see an Access Denied message$/, function () {
            // We wait to see the Access Denied message
            return this.client.
                waitForExist(".access-denied").
                getText(".access-denied h2").should.become("Access Denied");
        });


    }
})()
