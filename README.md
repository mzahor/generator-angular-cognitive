# generator-angular-cognitive [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Generator for https://github.com/mzahor/angularjs-boilerplate

## Installation

First, install [Yeoman](http://yeoman.io) and generator-angular-cognitive using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-angular-cognitive
```

Then generate your new project:

```bash
yo angular-cognitive
```

## Available generators:

- component (`yo angular-cognitive:component`)
- directive (`yo angular-cognitive:directive`)
- service (`yo angular-cognitive:service`)
- filter (`yo angular-cognitive:filter`)
- module (`yo angular-cognitive:module`)

## Registration

Components, directives, services and filters will be registered in the application automatically. Module needs manual registration, though. After you've generated a module, edit main.js file:
```js
// add import
import './yourNewModule';

// create and bootstrap application
const requires = [
    // ... list of dependencies
    // add your new module dependency
    'app.yourNewModule',
];
```
And you're good to go.

## Getting To Know Yeoman

Yeoman has a heart of gold. He&#39;s a person with feelings and opinions, but he&#39;s very easy to work with. If you think he&#39;s too opinionated, he can be easily convinced. Feel free to [learn more about him](http://yeoman.io/).

## License

MIT © [Marian Zagoruiko]()


[npm-image]: https://badge.fury.io/js/generator-angular-cognitive.svg
[npm-url]: https://npmjs.org/package/generator-angular-cognitive
[travis-image]: https://travis-ci.org/mzahor/generator-angular-cognitive.svg?branch=master
[travis-url]: https://travis-ci.org/mzahor/generator-angular-cognitive
[daviddm-image]: https://david-dm.org/mzahor/generator-angular-cognitive.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/mzahor/generator-angular-cognitive
[coveralls-image]: https://coveralls.io/repos/mzahor/generator-angular-cognitive/badge.svg
[coveralls-url]: https://coveralls.io/r/mzahor/generator-angular-cognitive
