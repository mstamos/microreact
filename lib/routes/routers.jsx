FlowRouter.route('/', {
    name: "postsList",
    subscriptions (params) {
        this.register("posts", Meteor.subscribe("posts"));
    },
    action () {
        React.render(<PostListContainer />, document.getElementById("yield-section"));
    }
});

FlowRouter.route('/posts/:_id', {
    name: "postPage",
    subscriptions (params) {
        this.register("post", Meteor.subscribe("post", params._id));
        this.register("comments", Meteor.subscribe("comments", params._id));
    },
    action (params) {
        React.render(<PostPage _id={params._id}/>, document.getElementById("yield-section"));
    }
});

FlowRouter.route('/posts/:_id/edit', {
    name: "postEdit",
    subscriptions (params) {
        this.register("post", Meteor.subscribe("post", params._id));
    },
    action (params) {
        React.render(<PostEdit _id={params._id}/>, document.getElementById("yield-section"))
    }
});

FlowRouter.route('/submit', {
    name: "postSubmit",
    action (params) {
        React.render(<PostSubmit />, document.getElementById("yield-section"));
    }
});

FlowRouter.route('/authentication', {
    name: "authentication",
    action (params) {
        React.render(<Registration />, document.getElementById("yield-section"));
    }
});

FlowRouter.notFound = {
    action () {
        React.render(<NotFound />, document.getElementById("yield-section"));
    }
};