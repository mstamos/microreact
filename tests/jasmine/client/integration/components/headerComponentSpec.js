describe("Header Component", function () {
    var renderComponentWithProps, post;

    beforeEach(function () {

        renderComponentWithProps = function (component, props, renderType) {
            if (renderType === "shallow") {
                post = createComponent(component, props);
            } else if (renderType == "normal") {
                post = renderComponent(component, props);
            }
        }
    });
    
    it("should not show post submit button to anonymous user", function () {
        // We render our component
        renderComponentWithProps(Header, {}, "normal");
        // We try to find the submit button
        var postSubmitLink = TestUtils.scryRenderedDOMComponentsWithClass(post, "submit-post-but");

        // We get the length of the search result
        var actual = postSubmitLink.length;
        // We expect to be zero
        var expected = 0;
        expect(actual).toBe(expected);

    });

    it("should be able to login normal user", function (done) {
        // We login our user
        Meteor.loginWithPassword("miltos@example.com", "passpass", function (err) {
            // We expect not to have errors
            expect(err).toBeUndefined();
            done();
        });
    });

    it("should be show submit post button to registered user", function () {
        // We render our component
        renderComponentWithProps(Header, {}, "normal");
        // We search for the submit button
        var postSubmitLink = TestUtils.scryRenderedDOMComponentsWithClass(post, "submit-post-but");

        // We get the length of the above search results
        var actual = postSubmitLink.length;
        // We expect to find our button
        var expected = 1;
        expect(actual).toBe(expected);
    });

    it("should be able to logout", function (done) {
        // We logout our user
        Meteor.logout(function (err) {
            expect(err).toBeUndefined();
            done();
        });
    });

    it("should be throw error if credentials are wrong", function (done) {
        // We login our user with wrong credentials
        Meteor.loginWithPassword("WrongUser", "WrongPass", function (err) {
            // We expect errors to be returned
            expect(err).toBeDefined();
            done();
        })
    });
});