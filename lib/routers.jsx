FlowRouter.route('/', {
   name: "postList",
    subscriptions: function (params) {
        this.register("posts", Meteor.subscribe("posts"))
    },
    action: function () {
        React.render( <PostList />, document.getElementById("yield-section"));
    }
});

FlowRouter.route('/submit', {
    name: "postSubmit",
    action: function () {
        React.render(<PostSubmit />, document.getElementById("yield-section") );
    }
});