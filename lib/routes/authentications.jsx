FlowRouter.route('/sign-in', {
    name: "sign-in",
    action: function (params) {

    }
});

FlowRouter.route('/sign-up', {
    name: 'sign-up',
    action: function (params) {
        React.render(<Registration />, document.getElementById("yield-section"));
    }
});

FlowRouter.route('/forgot-pass', {
    name: 'forgot-pass',
    action: function (params) {

    }
});
FlowRouter.route('/reset-pass', {
    name: 'reset-pass',
    action: function (params) {

    }
});