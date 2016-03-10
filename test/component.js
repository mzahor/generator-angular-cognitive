'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('generator-angular-cognitive:component', function() {
    before(function(done) {
        helpers.run(path.join(__dirname, '../generators/component'))
            .withPrompts({ moduleName: 'movies' })
            .withPrompts({ componentName: 'movieElement' })
            .on('end', done);
    });

    it('creates files', function() {
        assert.file([
            'app/js/movies/components/movie.element.component.js',
            'app/js/movies/components/movie.element.component.spec.js',
            'app/js/movies/components/movie.element.component.scss',
        ]);
    });

    describe('component.js', function() {
        it('should generate component name', function() {
            assert.fileContent(
                'app/js/movies/components/movie.element.component.js',
                'function MovieElementComponent'
            );
        });

        it('should generate component template', function() {
            assert.fileContent(
                'app/js/movies/components/movie.element.component.js',
                'class="movie-element-component"'
            );
        });

        it('should generate component controller', function() {
            assert.fileContent(
                'app/js/movies/components/movie.element.component.js',
                'function MovieElementComponentController'
            );
        });

        it('should generate component export object', function() {
            assert.fileContent(
                'app/js/movies/components/movie.element.component.js',
                'name: \'movieElement\''
            );

            assert.fileContent(
                'app/js/movies/components/movie.element.component.js',
                'type: \'component\''
            );

            assert.fileContent(
                'app/js/movies/components/movie.element.component.js',
                'fn: MovieElementComponent'
            );
        });
    });

    describe('component.spec.js', function() {
        it('should generate unit test', function() {
            assert.fileContent(
                'app/js/movies/components/movie.element.component.spec.js',
                'Unit: MovieElement'
            );

            assert.fileContent(
                'app/js/movies/components/movie.element.component.spec.js',
                'angular.mock.module(\'app.movies\')'
            );

            assert.fileContent(
                'app/js/movies/components/movie.element.component.spec.js',
                '<movie-element></movie-element>'
            );

            assert.fileContent(
                'app/js/movies/components/movie.element.component.spec.js',
                'element.querySelector(\'.movie-element-component\')'
            );
        });
    });

    describe('component.scss', function() {
        it('should generate class', function() {
            assert.fileContent(
                'app/js/movies/components/movie.element.component.scss',
                '.movie-element-component {'
            );
        });
    });
});
