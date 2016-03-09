function <%= filterPascalName %>Registrator() {
    return <%= filterPascalName %>;

    function <%= filterPascalName %> () {
        'ngInject';

        return function(input) {
            return input.replace(/underscore/ig, 'lodash');
        };
    }
}

export default {
    name: '<%= filterCamelName %>',
    type: 'filter',
    fn: <%= filterPascalName %>Registrator,
}
