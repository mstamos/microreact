TestUtils = React.addons.TestUtils;
Simulate = TestUtils.Simulate;

renderComponent = function (comp, props) {
    return TestUtils.renderIntoDocument(
        React.createElement(comp, props)
    );
};
