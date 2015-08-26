(function () {
    'use strict';

    module.exports = function () {
        this.Given(/^I fill in title with "([^"]*)"$/, function (postTitle) {
            // We set the passing title into #title input field
            return this.client.
                setValue("#title", postTitle);
        });

        this.Given(/^I fill in url with "([^"]*)"$/, function (postUrl) {
            // We set the passing url into #url input field
            return this.client.
                setValue("#url", postUrl);
        });

        this.When(/^I submit the form$/, function () {
            // We click on submit button
            return this.client.
                submitForm(".sub-post-but");
        });

        this.Then(/^I should see the new Post with title "([^"]*)"$/, function (postTitle) {
            // After the post submission we wait for post-title to exist and check if it is equal with
            // the passing post title as we expected
            return this.client.
                waitForExist(".post-title").
                getText(".post-title").should.become(postTitle);
        });
    }

})();