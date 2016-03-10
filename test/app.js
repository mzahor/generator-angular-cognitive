'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('generator-angular-cognitive:app', function() {
    before(function(done) {
        helpers.run(path.join(__dirname, '../generators/app'))
            .withPrompts({ appname: 'testApp' })
            .on('end', done);
    });

    it('creates files', function() {
        assert.file([
            'package.json',
            'app/js/main.js',
            'app/index.html',
            'gulp/index.js',
            'test/karma.conf.js',
            'test/protractor.conf.js',
        ]);

        assert.noFile([
            '.git',
        ]);
    });

    it('sets the name', function() {
        assert.fileContent(
            'package.json',
            'testApp'
        );
    });
});
