# [Documentation table of contents](TOC.md) | Overview

## Prerequisites

* Understand basic node package management (npm) usage

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


## Basic structure

```
.
├── app
│   └── src (Source directory)
│       ├── assets (Common stuffs e.g. images, fonts, external library and etc.)
│       ├── js
│       │   ├── specs (Code spec. for unit testing) 
│       │   └── index.js (Entry point for your application) 
│       ├── scss
│       ├── style.scss
│       └── index.html (HTML template) 
├── public (Production version for built-in node server or distribute to other environment)
├── doc (Documentation)
├── server.js (Simple node server script)
├── gulfile.bable.js (Automate workflow configuration)
├── package.json (Deployment and project configuration)
└── webpack.config.js (Webpack configuration file)

```

## Usage

Once you have cloned or downloaded Starter Kit, creating a site or app usually involves the following:

#### Development

1. Install dependencies package via ```$ npm install```
2. Add your code e.g. content, style, and functionality in your src/ folder.
3. Run the development server ```$ npm start```
4. Access your local development site via URL http://localhost:3000/


#### Run production server

1. Install dependencies package via ```$ npm install```, if needed
2. Deploy your web app ```$ npm run deploy```, script create ```public/``` folder.
3. Run the production server ```$ npm run server```
4. Access your production site via URL http://localhost:8080/

#### Distribute your web app with other environment

* Apache

    Build your web app, run ```$ npm run deploy```, the script will create ```public``` folder, then copy this folder to the destination (e.g. /var/html/)

* Dockerize web app (Required docker)
    
    1. Build your web app, run ```$ npm run deploy```.
    2. Build Docker image run ```$ docker build -t <your username>/<name>```.

* Sbt

    If you want to integrate with other build tool e.g. sbt. You can make some following configurations:

    1. Carefully copy your web app project to the Lift project root folder.

    2. Change the deployment target folder in gulpfile.bable.js.
    
        default deployment folder
        ```javascript
            ...
              deployTarget: 'public', // webapp folder in Lift framework
            ...
        ```        
    
        change to webapp folder in Sbt
        ```javascript
            ...
              deployTarget: 'src/main/webapp', // webapp folder in Sbt
            ...
        ```

    3. Change package command in package.json file.  

        ```javascript
            "scripts": {
                ...
                "package": "npm install && npm run deploy && sbt package" //Add sbt package  
            }
        ```

        * "npm install" - install package dependencies that use by web app
        * "npm run deploy" - build web app and deploy to target folder
        * "sbt package" - package web app using sbt

    4. Run package command in your console, you will get a .war file

        ```
            $ npm run package
        ```

#### Testing

This starter kit use [Mocha](https://mochajs.org) javascript test framework for testing javascript code.

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

#### Basic Command
