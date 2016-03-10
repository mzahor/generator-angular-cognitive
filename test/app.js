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
            'package.json'
        ]);
    });
});
