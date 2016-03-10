'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('generator-angular-cognitive:directive', function() {
    before(function(done) {
        helpers.run(path.join(__dirname, '../generators/directive'))
            .withPrompts({ moduleName: 'movies' })
            .withPrompts({ directiveName: 'focusOn' })
            .on('end', done);
    });

    it('creates files', function() {
        assert.file([
            'app/js/movies/directives/focus.on.directive.js',
            'app/js/movies/directives/focus.on.directive.spec.js',
            'app/js/movies/directives/focus.on.directive.scss',
        ]);
    });

    describe('directive.js', function() {
        it('should generate directive name', function() {
            assert.fileContent(
                'app/js/movies/directives/focus.on.directive.js',
                'function FocusOnRegistrator'
            );
            assert.fileContent(
                'app/js/movies/directives/focus.on.directive.js',
                'function FocusOnDirective'
            );
        });

        it('should generate directive link function', function() {
            assert.fileContent(
                'app/js/movies/directives/focus.on.directive.js',
                'link: function FocusOnDirectiveLink'
            );
        });

        it('should generate directive export object', function() {
            assert.fileContent(
                'app/js/movies/directives/focus.on.directive.js',
                'name: \'focusOn\''
            );

            assert.fileContent(
                'app/js/movies/directives/focus.on.directive.js',
                'type: \'directive\''
            );

            assert.fileContent(
                'app/js/movies/directives/focus.on.directive.js',
                'fn: FocusOnRegistrator'
            );
        });
    });

    describe('directive.spec.js', function() {
        it('should generate unit test', function() {
            assert.fileContent(
                'app/js/movies/directives/focus.on.directive.spec.js',
                'Unit: FocusOnDirective'
            );

            assert.fileContent(
                'app/js/movies/directives/focus.on.directive.spec.js',
                'angular.mock.module(\'app.movies\')'
            );

            // should have dashed name in html template
            assert.fileContent(
                'app/js/movies/directives/focus.on.directive.spec.js',
                'focus-on'
            );
        });
    });

    describe('directive.scss', function() {
        it('should generate class', function() {
            assert.fileContent(
                'app/js/movies/directives/focus.on.directive.scss',
                '.focus-on-directive {'
            );
        });
    });
});
