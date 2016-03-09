'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
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
        }, {
            type: 'input',
            name: 'directiveName',
            message: 'Directive name:',
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
        viewCtx.directiveName = this.props.directiveName;
        viewCtx.directiveCamelName = humps.camelize(viewCtx.directiveName);
        viewCtx.directivePascalName = humps.pascalize(viewCtx.directiveName);
        viewCtx.directiveDottedName = humps.decamelize(viewCtx.directiveCamelName, { separator: '.' });
        viewCtx.directiveDashedName = humps.decamelize(viewCtx.directiveCamelName, { separator: '-' });

        this.fs.copyTpl(
            this.templatePath('directive.js'),
            this.destinationPath(
                `${config.appPath}/${viewCtx.moduleName}/directives/${viewCtx.directiveDottedName}.directive.js`
            ),
            viewCtx
        );

        this.fs.copyTpl(
            this.templatePath('directive.scss'),
            this.destinationPath(
                `${config.appPath}/${viewCtx.moduleName}/directives/${viewCtx.directiveDottedName}.directive.scss`
            ),
            viewCtx
        );

        this.fs.copyTpl(
            this.templatePath('directive.spec.js'),
            this.destinationPath(
                `${config.appPath}/${viewCtx.moduleName}/directives/${viewCtx.directiveDottedName}.directive.spec.js`
            ),
            viewCtx
        );
    }
});
