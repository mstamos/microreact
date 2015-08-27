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


        /**
         *   Scenario: An unregistered user cannot submit a new post
         */
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

        /**
         * Scenario: An unregistered user cannot add a comment
          */
        this.When(/^I navigate to a post$/, function () {
            // We save this object
            var self = this;
            // We can server side method
            // With this function we get a random post id
            return this.server.call("randomPost").then( function (postId) {
                // When we have post id we navigate into post page
               self.client.
                    url(url.resolve(process.env.ROOT_URL, "/posts/"+postId)).
                    waitForExist('.app-title');
            })
        });

        this.Then(/^I should not be able to insert comment$/, function () {
            // We wait for login-leave-comment id and we check if the message
            // Please log in to leave a comment. appeared
            return this.client.
                waitForExist("#login-leave-comment").
                getText("#login-leave-comment").should.become("Please log in to leave a comment.");
        });

    }
})()
