import angular from 'angular';
import * as _ from 'lodash';
var bulk = require('bulk-require');

const <%= moduleCamelName %>Module = angular.module(
    'app.<%= moduleDottedName %>', [
        'templates',
    ]);

export default <%= moduleCamelName %>Module;

var components = bulk(__dirname + '/components', [
    '**/*.component.js',
]);

var services = bulk(__dirname + '/services', [
    '**/*.service.js',
]);

var directives = bulk(__dirname + '/directives', [
    '**/*.directive.js',
]);

var filters = bulk(__dirname + '/filters', [
    '**/*.filter.js',
]);

function register(obj) {
    <%= moduleCamelName %>Module[obj.type](obj.name, obj.fn());
}

[
    ..._.values(components),
    ..._.values(directives),
    ..._.values(services),
    ..._.values(filters),
].forEach(x => register(x.default));

