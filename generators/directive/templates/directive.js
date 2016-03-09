function <%= directivePascalName %>Registrator() {
    return <%= directivePascalName %>Directive;

    function <%= directivePascalName %>Directive($timeout) {
        'ngInject'
        return {
            restrict: 'A',
            link: function <%= directivePascalName %>DirectiveLink($scope, $element, attrs, ctrl) {
                var element = $element[0];
                // replace this body
                $timeout(function() {
                    element.focus();
                });
            }
        }
    }
}

export default {
    name: '<%= directiveCamelName %>',
    type: 'directive',
    fn: <%= directivePascalName %>Registrator
};
