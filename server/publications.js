Meteor.publish("posts", function () {
    return Posts.find();
});
Meteor.publish("post", function (postId) {
    console.log(postId);
    return Posts.find({_id:postId});
});
Meteor.publish('comments', function(postId) {
    check(postId, String);
    return Comments.find({postId: postId});
});