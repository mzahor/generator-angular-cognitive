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
            name: 'componentName',
            message: 'Component name:',
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
        viewCtx.componentName = this.props.componentName;
        viewCtx.componentCamelName = humps.camelize(viewCtx.componentName);
        viewCtx.componentPascalName = humps.pascalize(viewCtx.componentName);
        viewCtx.componentDottedName = humps.decamelize(viewCtx.componentCamelName, { separator: '.' });
        viewCtx.componentDashedName = humps.decamelize(viewCtx.componentCamelName, { separator: '-' });

        this.fs.copyTpl(
            this.templatePath('component.js.ejs'),
            this.destinationPath(
                `${config.appPath}/${viewCtx.moduleName}/components/${viewCtx.componentDottedName}.component.js`
            ),
            viewCtx
        );

        this.fs.copyTpl(
            this.templatePath('component.scss.ejs'),
            this.destinationPath(
                `${config.appPath}/${viewCtx.moduleName}/components/${viewCtx.componentDottedName}.component.scss`
            ),
            viewCtx
        );

        this.fs.copyTpl(
            this.templatePath('component.spec.js.ejs'),
            this.destinationPath(
                `${config.appPath}/${viewCtx.moduleName}/components/${viewCtx.componentDottedName}.component.spec.js`
            ),
            viewCtx
        );
    }
});
