FlowRouter.route('/', {
   name: "postList",
    subscriptions: function (params) {
        this.register("posts", Meteor.subscribe("posts"))
    },
    action: function () {
        React.render( <PostList />, document.getElementById("yield-section"));
    }
});