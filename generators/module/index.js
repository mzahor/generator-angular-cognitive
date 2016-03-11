'use strict';
var yeoman = require('yeoman-generator');
var humps = require('humps');
var config = require('../../config');

module.exports = yeoman.generators.Base.extend({
    prompting: function() {
        var done = this.async();

        var prompts = [{
            type: 'input',
            name: 'moduleName',
            message: 'Module name:',
            store: true,
        }];

        this.prompt(prompts, function(props) {
            this.props = props;
            done();
        }.bind(this));
    },

    writing: function() {
        var viewCtx = {};
        viewCtx.moduleName = this.props.moduleName;
        viewCtx.moduleCamelName = humps.camelize(viewCtx.moduleName);
        viewCtx.modulePascalName = humps.pascalize(viewCtx.moduleName);
        viewCtx.moduleDottedName = humps.decamelize(viewCtx.moduleCamelName, { separator: '.' });
        viewCtx.moduleDashedName = humps.decamelize(viewCtx.moduleCamelName, { separator: '-' });

        this.fs.copyTpl(
            this.templatePath('index.js'),
            this.destinationPath(
                `${config.appPath}/${viewCtx.moduleCamelName}/index.js`
            ),
            viewCtx
        );

        this.fs.copy(
            this.templatePath('.gitkeep'),
            this.destinationPath(
                `${config.appPath}/${viewCtx.moduleName}/components/.gitkeep`
            )
        );

        this.fs.copy(
            this.templatePath('.gitkeep'),
            this.destinationPath(
                `${config.appPath}/${viewCtx.moduleName}/directives/.gitkeep`
            )
        );

        this.fs.copy(
            this.templatePath('.gitkeep'),
            this.destinationPath(
                `${config.appPath}/${viewCtx.moduleName}/filters/.gitkeep`
            )
        );

        this.fs.copy(
            this.templatePath('.gitkeep'),
            this.destinationPath(
                `${config.appPath}/${viewCtx.moduleName}/services/.gitkeep`
            )
        );
    }
});
