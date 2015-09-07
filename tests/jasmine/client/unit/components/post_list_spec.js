describe("PostList", function () {
    var renderComponentWithProps, post, el, $el;

    beforeEach(function () {

        renderComponentWithProps = function (component, props, renderType, data) {
            if (renderType === "shallow") {
                post = createComponent(component, props);
            } else if (renderType == "normal") {
                post = renderComponent(component, props);
                el = React.findDOMNode(post);
                $el = $(el);
            }
        }
    });

    it("should render a list of post components", function () {
        // We set mock data
        var posts = {
            allPosts: [
                {id: 1, title: "First Post", url:"Not found", author:"Miltos", commentsCount: 5},
                {id: 2, title: "Second Post", url:"401 for the win", author:"Milkos", commentsCount: 3}
            ]
        }

        // We shallow render our component with our mock data
        renderComponentWithProps(PostList, posts , "shallow");
        // We get the number of its children
        var actual = post.props.children.length;
        // We expect to has 2 posts as the length of mock data
        var expected = 2;

        expect(actual).toBe(expected);
    });
});
