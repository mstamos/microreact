describe("PostList", function () {
    var renderComponentWithProps, post, el, $el, posts;

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
        // We set mock data
        posts = {
            allPosts: [
                {id: 1, title: "First Post", url:"Not found", author:"Miltos", commentsCount: 5},
                {id: 2, title: "Second Post", url:"401 for the win", author:"Milkos", commentsCount: 3}
            ]
        }
    });

    it("should render a list of posts", function () {


        // We shallow render our component with our mock data
        renderComponentWithProps(PostList, posts , "shallow");
        // We get the number of its children
        var actual = post.props.children.length;
        // We expect to has 2 posts as the length of mock data
        var expected = posts.allPosts.length;

        expect(actual).toBe(expected);
    });

    it("should render a list of PostItem", function () {

        // We shallow render our component with our mock data
        renderComponentWithProps(PostList, posts , "shallow");
        // We check for every children of PostList component to be element of type PostItem
        var items = post.props.children.filter(function (postLitItem) {
            return TestUtils.isElementOfType(postLitItem, PostItem);
        });
        // The actual length of items array.
        var actual = items.length;
        // The expected size of items array. As the number of posts
        var expected = posts.allPosts.length;
        expect(actual).toBe(expected);
        
    });
});
