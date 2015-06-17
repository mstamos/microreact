FlowRouter.route('/', {
    name: "postList",
    subscriptions: function (params) {
        this.register("posts", Meteor.subscribe("posts"));
    },
    action: function () {
        React.render( <PostList />, document.getElementById("yield-section"));
    }
});

FlowRouter.route('/posts/:_id', {
    name: "postPage",
    subscriptions: function (params) {
        this.register("post", Meteor.subscribe("post", params._id));
        this.register("comments", Meteor.subscribe("comments", params._id))
    },
    action (params) {
        React.render ( <PostItem
                        _id={params._id}/>,
            document.getElementById("yield-section"));
    }
});

FlowRouter.route('/submit', {
    name: "postSubmit",
    action: function (params) {
        React.render(<PostSubmit />, document.getElementById("yield-section") );
    }
});

FlowRouter.route('/authentication', {
    name: "authentication",
    action: function (params) {
        React.render(<Registration />, document.getElementById("yield-section"));
    }
});
