'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('generator-angular-cognitive:filter', function() {
    before(function(done) {
        helpers.run(path.join(__dirname, '../generators/filter'))
            .withPrompts({ moduleName: 'movies' })
            .withPrompts({ filterName: 'lodashifyThis' })
            .on('end', done);
    });

    it('creates files', function() {
        assert.file([
            'app/js/movies/filters/lodashify.this.filter.js',
            'app/js/movies/filters/lodashify.this.filter.spec.js',
        ]);
    });

    describe('filter.js', function() {
        it('should generate filter name', function() {
            assert.fileContent(
                'app/js/movies/filters/lodashify.this.filter.js',
                'function LodashifyThisRegistrator()'
            );
            assert.fileContent(
                'app/js/movies/filters/lodashify.this.filter.js',
                'function LodashifyThis()'
            );
        });

        it('should generate component export object', function() {
            assert.fileContent(
                'app/js/movies/filters/lodashify.this.filter.js',
                'name: \'lodashifyThis\''
            );

            assert.fileContent(
                'app/js/movies/filters/lodashify.this.filter.js',
                'type: \'filter\''
            );

            assert.fileContent(
                'app/js/movies/filters/lodashify.this.filter.js',
                'fn: LodashifyThisRegistrator'
            );
        });
    });

    describe('filter.spec.js', function() {
        it('should generate unit test', function() {
            assert.fileContent(
                'app/js/movies/filters/lodashify.this.filter.spec.js',
                'Unit: LodashifyThisFilter\''
            );

            assert.fileContent(
                'app/js/movies/filters/lodashify.this.filter.spec.js',
                'angular.mock.module(\'app.movies\')'
            );

            assert.fileContent(
                'app/js/movies/filters/lodashify.this.filter.spec.js',
                '$filter(\'lodashifyThis\');'
            );
        });
    });
});
