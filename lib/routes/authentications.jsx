FlowRouter.route('/authentication', {
    name: "authentication",
    action: function (params) {
        React.render(<Registration />, document.getElementById("yield-section"));
    }
});
