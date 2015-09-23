describe("PostSubmit", function () {
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

    describe("User is logged in", function () {

        beforeEach(function () {
            // We spyOn Meteor.userId to provide a user id
            spyOn(Meteor, "userId").and.returnValue("xyz");
        });

        it("should generate a submit form", function () {
            // We shallow render our component
            renderComponentWithProps(PostSubmit, {}, "shallow");
            // We get the length of component's children
            var actual = post.props.children.length;
            // We expect to has 3 children the 2 input fields and the button
            var expected = 3;
            expect(actual).toBe(expected);
        });

        it("should render an input for post's title", function () {
            // We render the component
            renderComponentWithProps(PostSubmit, {}, "shallow");
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
            renderComponentWithProps(PostSubmit, {}, "shallow");
            // We get the post url children from PostSubmit component
            var postUrl = post.props.children[1];

            var actual = postUrl.props.title;
            var expected = "URL";

            expect(actual).toBe(expected);
        });

        it("should render an error when the title is empty", function () {
            // We render our component
            renderComponentWithProps(PostSubmit, {}, "normal");
            // We get all input fields from our component
            var inputs = TestUtils.scryRenderedDOMComponentsWithTag(post, "input");
            // We find the title input component
            var titleInput = inputs.find((el) => {
                return el.props.name == 'title'
            });
            // We find the error area above title input. These area has a span tag
            var titleError = React.findDOMNode(titleInput).parentNode.querySelector("span");


            // We search for form tag into rendered component
            var form = TestUtils.findRenderedDOMComponentWithTag(post, "form");
            // We simulate the submission
            // on this submission the default value for title and url are "" (empty)
            // so after submit we will have an error message
            TestUtils.Simulate.submit(form.getDOMNode());

            expect(titleError.innerHTML).toBe("Please fill in a headline");
        });

        it("should render an error when the url input is empty", function () {
            // We render our component
            renderComponentWithProps(PostSubmit, {}, "normal");
            // We get all input fields from our component
            var inputs = TestUtils.scryRenderedDOMComponentsWithTag(post, "input");
            // We find the url input component
            var urlInput = inputs.find((el) => {
                return el.props.name == 'url'
            });
            // We find the error section below url input
            var urlError = React.findDOMNode(urlInput).parentNode.querySelector("span");
            // We find the title input component
            var titleInput = inputs.find((el) => {
                return el.props.name == 'title'
            });
            // We change the value of the title input so only the url input to be empty
            TestUtils.Simulate.change(titleInput, {target: {value: "someValue"}});
            // We search for form tag into rendered component
            var form = TestUtils.findRenderedDOMComponentWithTag(post, "form");
            // We simulate the submission
            // on this submission the default value for url is "" (empty)
            // so after submit we will have an error message
            TestUtils.Simulate.submit(form.getDOMNode());
            // We expect to be rendered the error message for url
            expect(urlError.innerHTML).toBe("Please fill in a URL");
        });

        it("should call formSubmission when submit the form",  () => {
            // We render into DOM our component
            renderComponentWithProps(PostSubmit, {}, "normal");
            // We spy on formSubmission function which is responsible
            // to submit the new post
            spyOn(post, "formSubmission");

            // We search for form tag into rendered component
            var form = TestUtils.findRenderedDOMComponentWithTag(post, "form");
            // We simulate the submission
            TestUtils.Simulate.submit(form.getDOMNode());
            // We expect after the submission our function to have been called
            expect(post.formSubmission).toHaveBeenCalled();
        });
    });

    describe("User is not logged in", function () {
        beforeEach(function () {
            // We spyOn Meteor.userId to provide null userId
            spyOn(Meteor, "userId").and.returnValue(null);
        });

        it("should render AccessDenied component ", () => {
            // We render the component
            renderComponentWithProps(PostSubmit, {}, "shallow");


            var actual = post.type;
            var expected = AccessDenied;

            expect(actual).toBe(expected);
        });
    });


});