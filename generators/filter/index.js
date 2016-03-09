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
            name: 'filterName',
            message: 'Filter name:',
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
        viewCtx.filterName = this.props.filterName;
        viewCtx.filterCamelName = humps.camelize(viewCtx.filterName);
        viewCtx.filterPascalName = humps.pascalize(viewCtx.filterName);
        viewCtx.filterDottedName = humps.decamelize(viewCtx.filterCamelName, { separator: '.' });

        this.fs.copyTpl(
            this.templatePath('filter.js'),
            this.destinationPath(
                `${config.appPath}/${viewCtx.moduleName}/filters/${viewCtx.filterDottedName}.filter.js`
            ),
            viewCtx
        );

        this.fs.copyTpl(
            this.templatePath('filter.spec.js'),
            this.destinationPath(
                `${config.appPath}/${viewCtx.moduleName}/filters/${viewCtx.filterDottedName}.filter.spec.js`
            ),
            viewCtx
        );
    }
});
