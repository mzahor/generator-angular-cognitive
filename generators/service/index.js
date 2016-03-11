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
        }, {
            type: 'input',
            name: 'serviceName',
            message: 'ServiceName name ("Service" suffix will be added automatically):',
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
        viewCtx.serviceName = this.props.serviceName;
        viewCtx.serviceCamelName = humps.camelize(viewCtx.serviceName);
        viewCtx.servicePascalName = humps.pascalize(viewCtx.serviceName);
        viewCtx.serviceDottedName = humps.decamelize(viewCtx.serviceCamelName, { separator: '.' });

        this.fs.copyTpl(
            this.templatePath('service.js.ejs'),
            this.destinationPath(
                `${config.appPath}/${viewCtx.moduleName}/services/${viewCtx.serviceDottedName}.service.js`
            ),
            viewCtx
        );

        this.fs.copyTpl(
            this.templatePath('service.spec.js.ejs'),
            this.destinationPath(
                `${config.appPath}/${viewCtx.moduleName}/services/${viewCtx.serviceDottedName}.service.spec.js`
            ),
            viewCtx
        );
    }
});
