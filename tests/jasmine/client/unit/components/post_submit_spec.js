describe("PostSubmit", function () {
    var renderComponentWithProps, shallowComponentWithProps, post, el, $el, utilPost, renderedPost, renderType;

    beforeEach(function () {

        renderComponentWithProps = function (props, renderType) {

            if (renderType === "shallow") {
                post = createComponent(PostSubmit, props);
            } else if (renderType == "normal") {
                post = renderComponent(PostSubmit, props);
                el = React.findDOMNode(utilPost);
                $el = $(el);
            }
        }
    });

    describe("User is logged in", function () {

        beforeEach (function () {
            // We spyOn Meteor.userId to provide a user id
            spyOn(Meteor, "userId").and.returnValue("xyz");
        });

        it("should render an input for post's title", function () {
            // We render the component
            renderComponentWithProps({}, "shallow");
            //We get the post title children from PostSubmit component
            var postTitle = post.props.children[0];

            // We write what is the actual output and what the expected to
            // make our tests more readable
            var actual = postTitle.props.title;
            var expected = "Title";

            expect(actual).toBe(expected);
        });

        it("should render an input for post's url", function () {
            // We render the component
            renderComponentWithProps({}, "shallow");
            // We get the post url children from PostSubmit component
            var postUrl = post.props.children[1];

            var actual = postUrl.props.title;
            var expected = "URL";

            expect(actual).toBe(expected);
        });

        it("should handleInputChange() change titleValue state", function () {
            // We render the component into dom
            renderComponentWithProps({}, "normal");
            // We call handleInputChange function from the rendered PostSubmit component
            // and we pass some data
            post.handleInputChange("title", "New Title");
            // We write down the actual value of state titleValue
            var actual = post.state.titleValue;
            // We write down the expected value after we run the function
            var expected = "New Title";

            expect(actual).toBe(expected);

        });
    });

    describe("User is not logged in", function () {
        beforeEach(function () {
            // We spyOn Meteor.userId to provide null userId
            spyOn(Meteor, "userId").and.returnValue(null);
        });

        it("should render AccessDenied component ", function () {
            // We render the component
            renderComponentWithProps({}, "shallow");

            var actual = post.type;
            var expected = AccessDenied;

            expect(actual).toBe(expected);
        });
    });


});