describe("PostSubmit", function () {
    var defProps, renderWithProps, component, el, $el;

    beforeEach(function () {
        renderWithProps = function (props) {
            component = renderComponent(PostSubmit, props);
            el = React.findDOMNode(component);
            $el = $(el);
        };
    });

    it("should render an input for post's title", function () {
        // We spyOn Meteor.userId to provide a user id
        spyOn(Meteor, "userId").and.returnValue("xyz");
        // We render the component
        renderWithProps({});
        // We get the dom element with class title
        var titleInput = TestUtils.findRenderedDOMComponentWithClass(component, "title");
        // We expect to be defined"
        expect(titleInput).toBeDefined();
    });

});