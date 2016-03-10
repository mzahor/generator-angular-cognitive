'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('generator-angular-cognitive:service', function() {
    before(function(done) {
        helpers.run(path.join(__dirname, '../generators/service'))
            .withPrompts({ moduleName: 'movies' })
            .withPrompts({ serviceName: 'moviesData' })
            .on('end', done);
    });

    it('creates files', function() {
        assert.file([
            'app/js/movies/services/movies.data.service.js',
            'app/js/movies/services/movies.data.service.spec.js',
        ]);
    });

    describe('service.js', function() {
        it('should generate service', function() {
            assert.fileContent(
                'app/js/movies/services/movies.data.service.js',
                'function MoviesDataServiceRegistrator()'
            );
            assert.fileContent(
                'app/js/movies/services/movies.data.service.js',
                'function MoviesDataService()'
            );
        });

        it('should generate service export object', function() {
            assert.fileContent(
                'app/js/movies/services/movies.data.service.js',
                'name: \'MoviesDataService\''
            );

            assert.fileContent(
                'app/js/movies/services/movies.data.service.js',
                'type: \'service\''
            );

            assert.fileContent(
                'app/js/movies/services/movies.data.service.js',
                'fn: MoviesDataServiceRegistrator'
            );
        });
    });

    describe('service.spec.js', function() {
        it('should generate unit test', function() {
            assert.fileContent(
                'app/js/movies/services/movies.data.service.spec.js',
                'Unit: MoviesDataService\''
            );

            assert.fileContent(
                'app/js/movies/services/movies.data.service.spec.js',
                'angular.mock.module(\'app.movies\')'
            );

            assert.fileContent(
                'app/js/movies/services/movies.data.service.spec.js',
                'service = _MoviesDataService_;'
            );
        });
    });
});
