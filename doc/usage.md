[Front End Starter Kit - React](/) | [Documentation table of contents](TOC.md)


## Prerequisites

This starter kit requires a node package management (npm) installed on your machine.

* Install Node.js https://nodejs.org/en/download/
* Once you have completed installation, you will get 'node' and 'npm' working if you execute below command on your machine.

```
    $ node -v
    v5.11.0
```

```
    $ npm -v
    3.8.6
```


## Usage

Once you have cloned or downloaded Starter Kit, creating a site or app usually involves the following:

#### Development

1. Install dependencies package via npm

```
    $ npm intall
```

2. Add some content, style, and functionality.

3. Run the development server

```
    $ npm start
```

4. Access your local development site via http://localhost:3000/

#### Build web app for distribution 

- Build your web app, the automate script will create /dist folder for your distribution package (production version)

```
    $ npm dist
```

*If you want to integrate with other build tool e.g. sbt with Lift framework. You can make some following configurations:


1. Change the deployment target folder in gulpfile.bable.js.

```javascript
    ...
      deployTarget: 'src/main/webapp', // webapp folder in Lift framework
    ...
```

2. Change package command in package.json. Add 

```json
    ...
      "package": "npm install && npm run deploy && sbt package" // "sbt package"  
    ...
```

* "npm install" - install package dependencies that use by web app
* "npm run deploy" - build web app and deploy to target folder
* (Optional)"sbt package" - other build tool command

3. Run package command

```
    $ npm package
```



#### Testing

This starter kit use [Mocha](https://mochajs.org) javscript test framework for testing javascript code.

The followings are commands that use for running test 

- Run all testing on javascript spec file in /app/src/js/specs folder

```
  $ npm run test
```

- Run all testing on javascript spec file in /app/src/js/specs folder, and watch files for changes.

```
  $ npm run test:watch
```

- Run testing on specific javascript spec file, and watch for changes.

```
  $ npm run test:watch-file ./app/src/js/specs/<--any files-->
```


## Basic structure

- A basic file structure 

```
- /app
- /app/src - Source folder
- /dist - Distribution package
- gulfile.bable.js - Automate workflow configuration in es6
- webpack.config.js - Webpack bundle configuration
- package.json - Deployment and project configuration
```


- Source file structure (Working directory for your application)

```
- /app
- /app/src - Source folder
- /app/src/assets - Common stuffs e.g. images, fonts, external library and etc.
- /app/src/js - Javascript
- /app/src/js/specs - Spec for unit test
- /app/src/js/index.js - Entry point for your application 
- /app/src/scss - SCSS
- style.scss
- index.html
```


