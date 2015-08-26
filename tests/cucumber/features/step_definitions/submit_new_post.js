(function () {
    'use strict';

    module.exports = function () {
        this.Given(/^I fill in title with "([^"]*)"$/, function (postTitle) {
            return this.client.
                setValue("#title", postTitle);
        });

        this.Given(/^I fill in url with "([^"]*)"$/, function (postUrl) {
            return this.client.
                setValue("#url", postUrl);
        });

        this.When(/^I submit the form$/, function () {
            return this.client.
                submitForm(".sub-post-but");
        });

        this.Then(/^I should see the new Post with title "([^"]*)"$/, function (postTitle) {
            return this.client.
                waitForExist(".post-title").
                getText(".post-title").should.become(postTitle);
        });
    }

})();