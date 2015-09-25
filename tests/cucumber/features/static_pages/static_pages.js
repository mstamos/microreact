(function () {

    'use strict';

    module.exports = function () {

        this.Given(/^I am a new user$/, function (callback) {
            callback();
        });

        this.Then(/^I should see the title on the header "([^"]*)"$/, function (expectedTitle) {
            //As a new user when I navigate to home page must see application's title which is Microscope
            client.waitForExist('.app-title');

            var actual = client.getText('.app-title');
            var expected = expectedTitle;

            expect(actual).toBe(expected);
        });
    }
})();