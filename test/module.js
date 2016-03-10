'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('generator-angular-cognitive:module', function() {
    before(function(done) {
        helpers.run(path.join(__dirname, '../generators/module'))
            .withPrompts({ moduleName: 'userProfile' })
            .on('end', done);
    });

    it('should create files', function() {
        assert.file([
            'app/js/userProfile/index.js',
            'app/js/userProfile/components/.gitkeep',
            'app/js/userProfile/directives/.gitkeep',
            'app/js/userProfile/filters/.gitkeep',
            'app/js/userProfile/services/.gitkeep',
        ]);
    });

    describe('index.js', function() {
        it('should generate module description', function() {
            assert.fileContent(
                'app/js/userProfile/index.js',
                'const userProfileModule ='
            );

            assert.fileContent(
                'app/js/userProfile/index.js',
                '\'app.user.profile\', ['
            );

            assert.fileContent(
                'app/js/userProfile/index.js',
                'export default userProfileModule;'
            );

            assert.fileContent(
                'app/js/userProfile/index.js',
                '\'app.user.profile\', ['
            );
        });

        it('should generate registration function', function() {
            assert.fileContent(
                'app/js/userProfile/index.js',
                'userProfileModule[obj.type]'
            );
        });
    });
});
