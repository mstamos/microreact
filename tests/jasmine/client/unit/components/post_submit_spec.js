describe("PostSubmit", function () {
    var defProps, renderWithProps, post, el, $el;

    beforeEach(function () {
        renderWithProps = function (props) {
            post = createComponent(PostSubmit, props);
            //el = React.findDOMNode(component);
            //$el = $(el);
        };
    });

    it("should render an input for post's title", function () {
        // We spyOn Meteor.userId to provide a user id
        spyOn(Meteor, "userId").and.returnValue("xyz");
        // We render the component
        renderWithProps({});
        //We get the post title children from PostSubmit component
        var postTitle = post.props.children[0];

        // We write what is the actual output and what the expected to
        // make our tests more readable
        var actual = postTitle.props.title;
        var expected = "Title";

        expect(actual).toBe(expected);
    });

    it("should render an input for post's url", function () {
        // We spyOn Meteor.userId to provide a user id
        spyOn(Meteor, "userId").and.returnValue("xyz");
        // We render the component
        renderWithProps({});
        // We get the post url children from PostSubmit component
        var postUrl = post.props.children[1];

        var actual = postUrl.props.title;
        var expected = "URL";

        expect(actual).toBe(expected);
    });

    it("should render AccessDenied component if there isn't a user(Meteor.userId = null)", function () {
        // We spyOn Meteor.userId to provide null userId
        spyOn(Meteor, "userId").and.returnValue(null);
        // We render the component
        renderWithProps({});

        var actual = post.type;
        var expected = AccessDenied;

        expect(actual).toBe(expected);
    });
});