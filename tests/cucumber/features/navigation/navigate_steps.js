(function () {
    'use strict';

    module.exports = function () {
        var actual, expected;
        var url = require('url');

        this.When(/^I navigate to "([^"]*)"$/, function (relativePath) {
            //We get from scenario the path and navigate to it
            client.url(url.resolve(process.env.ROOT_URL, relativePath));
            client.waitForExist('.app-title');
        });


        /**
         *   Scenario: An unregistered user cannot submit a new post
         */
        this.When(/^I navigate to submit page$/, function () {
            //We navigate into /submit path
            client.url(url.resolve(process.env.ROOT_URL, "/submit"));
            client.waitForExist('.app-title');
        });

        this.Then(/^I should see an Access Denied message$/, function () {
            // We wait to see the Access Denied message
            client.waitForExist(".access-denied");

            actual = client.getText(".access-denied h2");
            expected = "Access Denied";

            expect(actual).toBe(expected);

        });

        /**
         * Scenario: An unregistered user cannot add a comment
         */
        this.When(/^I navigate to a post$/, function () {
            // We get a postId
            var postId =server.call("randomPost");
            // We navigate into post with the appropriate url
            client.url(url.resolve(process.env.ROOT_URL, "/posts/" + postId));
            client.waitForExist('.app-title');
        });

        this.Then(/^I should not be able to insert comment$/, function () {
            // We wait for login-leave-comment id and we check if the message
            // Please log in to leave a comment. appeared
            client.waitForExist("#login-leave-comment");

            actual = client.getText("#login-leave-comment");
            expected = "Please log in to leave a comment.";

            expect(actual).toBe(expected);
        });

    }
})()
