/* global module */

'use strict';

describe('Unit: <%= filterPascalName %>Filter', function() {

    let filter;

    beforeEach(function() {
        angular.mock.module('app.<%= moduleName %>');

        angular.mock.inject(($filter) => {
            filter = $filter('<%= filterCamelName %>');
        });
    });

    it('should render template', function() {
        const testString = 'underscore.js will save you ton of time';

        const resultString = filter(testString);

        expect(resultString).toEqual('lodash.js will save you ton of time');
    });

});
