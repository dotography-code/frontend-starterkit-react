# [Documentation table of contents](TOC.md) | Overview

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

1. Install dependencies package via ```$ npm intall```
2. Add some content, style, and functionality.
3. Run the development server ```$ npm start```
4. Access your local development site via URL http://localhost:3000/


#### Run production server

1. Install dependencies package via ```$ npm intall```, if needed
2. Deploy your web app ```$ npm run deploy```, script create ```public/``` folder.
3. Run the production server ```$ npm run server```
4. Access your production site via URL http://localhost:8080/

#### Distribute your web app with other environment

* Apache

    Build your web app, run ```$ npm run deploy```, the script will create ```public``` folder, then copy this folder to the destination (e.g. /var/html/)

* Dockerize web app
    
    1. Build your web app, run ```$ npm run deploy```.
    2. Build Docker image run ```$ docker build -t <your username>/<name>```.

* Sbt with Lift framework

    If you want to integrate with other build tool e.g. sbt with Lift framework. You can make some following configurations:

    1. Carefully copy your web app project to the Lift project root folder.

    2. Change the deployment target folder in gulpfile.bable.js.

        ```javascript
            ...
              deployTarget: 'src/main/webapp', // webapp folder in Lift framework
            ...
        ```

    3. Change package command in package.json. Add 

        ```javascript
            ...
              "package": "npm install && npm run deploy && sbt package" 
            ...
        ```

        "npm install" - install package dependencies that use by web app
        "npm run deploy" - build web app and deploy to target folder
        "sbt package" - package web app using sbt

    4. Run package command, you will get a .war file

        ```
            $ npm run package
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

```
.
├── app
│   ├── dist (Production version)
│   └── src (Source directory)
│       ├── assets (Common stuffs e.g. images, fonts, external library and etc.)
│       ├── js
│       │   ├── specs (Code spec. for unit testing) 
│       │   └── index.js (Entry point for your application) 
│       ├── scss
│       ├── style.scss
│       └── index.html (HTML template) 
├── doc (Documentation)
├── server.js (Simple node server script)
├── gulfile.bable.js (Automate workflow configuration)
├── package.json (Deployment and project configuration)
└── webpack.config.js (Webpack configuration file)


