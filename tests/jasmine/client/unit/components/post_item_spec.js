describe("PostItem", function () {
    var defProps, renderWithProps, component, el, $el;

    beforeEach(function() {
        defProps = {
            _id: "XYZ",
            title: "Meteor Point",
            url: "http://www.meteorpoint.com",
            author: "Miltos",
            commentsCount: 5
        }
        renderWithProps = function(props) {
            component = renderComponent(PostItem, props);
            el = React.findDOMNode(component);
            $el = $(el);
        };
    });

    it("should get the domain from the url", function () {
        expect(PostItem.prototype.getDomain("http://www.meteor.com")).toBe("www.meteor.com")
    });

    it("should print out post's title", function () {
        // We render the compoent
        renderWithProps(defProps);
        // We expect post's title to render
        // We use the jQuery to get the text from post-title class
        expect($el.children().find(".post-title").text()).toEqual("Meteor Point");
    });

    it("should display Edit button when user is the author", function () {
        // We create fake object to pass for Meteor.user() function
        var user = {
            username: "Miltos"
        }
        spyOn(Meteor, "user").and.returnValue(user);
        spyOn(Meteor, "userId").and.returnValue(true);
        // We render the object and we wait at jQuery object $el on text function
        // to find the Edit word
        renderWithProps(defProps);
        expect($el.text()).toContain("Edit");

    });
    //
    //it("should go to post page", function () {
    //    var fakeUrl = "posts/XYZ"
    //    spyOn(FlowRouter, "go").and.returnValue(fakeUrl);
    //    renderWithProps(defProps);
    //    expect(PostItem.prototype.showPost($.Event("click"))).toBe(fakeUrl);
    //    expect(FlowRouter.go.calls.argsFor(0)).toEqual("posts/XYZ");
    //});
    
});
