'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var util = require('util');
var glob = require('glob');
var _ = require('lodash');
var extend = _.assign;
var path = require('path');

// Helpers
var betterTypeErrors = function(expected, obj) {
    var type = typeof obj;
    throw new TypeError('Expected ' + expected + ' but got ' + type);
};

// Perform a shallow copy of an object ignoring specified properties
var copyExcept = function(obj, except) {
    var result = {};

    if (!_.isArray(except)) {
        betterTypeErrors('an array', obj);
    }

    if (!_.isObject(obj)) {
        betterTypeErrors('an object', obj);
    }

    for (var prop in obj) {
        if (except.indexOf(prop) >= 0 && obj.hasOwnProperty(prop)) {
            continue;
        }
        result[prop] = obj[prop];
    }

    return result;
};

// Generator initialization
var Generator = module.exports = function() {
    yeoman.Base.apply(this, arguments);
};

util.inherits(Generator, yeoman.Base);

Generator.prototype.welcome = function() {
    if (this.options['skip-welcome-message']) {
        return;
    }

    var title = 'Welcome!';
    var text = [
        'This is generator for scaffolding an application ',
        'based on AngularJS, SASS, Gulp, and Browserify!'
    ].join('\s');

    this.sourceRoot(path.join(this.sourceRoot(),'/angular-boilerplate'));

    this.log(yosay([chalk.red(title), chalk.yellow(text)].join('\n')));
};

Generator.prototype.askForGeneratorName = function() {
    var self = this;
    var done = self.async();
    var prompts = [{
        name: 'appname',
        message: 'What\'s the name of your app?',
        default: 'app'
    }];

    self.prompt(prompts, function(props) {
        self.appname = props.appname;
        done();
    });
};

Generator.prototype.copyAll = function() {
    var self = this;
    var files = glob.sync(
        '**', {
            dot: true,
            nodir: true,
            cwd: self.sourceRoot()
        });
    var exclude = [
        'package.json',
        '.git',
    ];
    var diff = _.difference(files, exclude);

    diff.forEach(function(value) {
        self.fs.copy(
            self.templatePath(value),
            self.destinationPath(value));
    });
};

Generator.prototype.gitignore = function() {
    if (this.fs.exists(this.templatePath('.gitignore'))) {
        this.copy('.gitignore', '.gitignore');
        return;
    }

    if (this.fs.exists(this.templatePath('.npmignore'))) {
        this.copy('.npmignore', '.gitignore');
    }
};

Generator.prototype.packageJSON = function() {
    var packageFile = this.templatePath('package.json');
    console.log('here');
    console.log(packageFile);
    var pkg = this.fs.readJSON(packageFile);
    var exclude = [
        'author',
        'repository',
        'private',
        'description',
    ];
    var newValues = {
        name: this.appname,
        version: '1.0.0'
    };
    var copy = extend(copyExcept(pkg, exclude), newValues);
    this.fs.writeJSON(this.destinationPath('package.json'), copy);
};

Generator.prototype.npm = function() {
    this.npmInstall();
};
