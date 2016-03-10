/* global module */

'use strict';

describe('Unit: <%= directivePascalName %>Directive', function() {

    let element;
    let scope;
    let compile;
    let timeout;

    beforeEach(function() {
        angular.mock.module('app.<%= moduleName %>');

        angular.mock.inject((_$compile_, $rootScope, _$timeout_) => {
            scope = $rootScope;
            compile = _$compile_;
            timeout = _$timeout_;
            initElement();
        });
    });

    function initElement() {
        let jElement = angular.element(
            '<input <%= directiveDashedName %>>Sample element</input>'
        );

        compile(jElement)(scope);
        scope.$digest();
        element = jElement[0];
    }

    it('should focus element', function() {
        initElement();
        document.body.appendChild(element);
        timeout.flush();
        expect(document.activeElement).toBe(element);
    });

});
