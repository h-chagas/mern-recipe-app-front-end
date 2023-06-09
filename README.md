client# Recipe App #
##### A MERN webapp project #####

_It is the FRONT-END side of the project. To visit the back-end, please check_ [here](https://github.com/h-chagas/mern-recipe-app-back-end)

### Technologies ###

See the packages used in this project

##### Client side #####

* React framework
* [react-router-dom](https://www.npmjs.com/package/react-router-dom)
    * _Declarative routing for React web applications_
* [axios](https://www.npmjs.com/package/axios)
    * _Promise based HTTP client for the browser and node.js_
* [react-cookie](https://www.npmjs.com/package/react-cookie)
    * _Universal cookies for JavaScript_

##### Server side #####

* [express](https://www.npmjs.com/package/express)
    * _Node.js web application framework that provides a robust set of features for web and mobile applications_
* [cors](https://www.npmjs.com/package/cors)
    * _a mechanism by which a front-end client can make requests for resources to an external back-end server_
* [bcrypt](https://www.npmjs.com/package/bcrypt)
    * _hashes the password created by the user_
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
    * _defines a compact and self-contained way for securely transmitting information between parties as a JSON object_
* [mongoose](https://www.npmjs.com/package/mongoose)
    * _allows developers to enforce a specific schema at the application layer_
* [nodemon](https://www.npmjs.com/package/nodemon), as a dev dependency
    * _monitors script for use during development of a Node.js app_

##### Stack #####

As a M.E.R.N project, this web application is built using

* [React](https://react.dev/)
* [Node.js](https://nodejs.org/en)
* [Express](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)

### Tips ###

#### Environment variable ####

In order to hide the database and other API username and passwords, create a .env in the root of the server directory. If you need to use secret information on the front-end side, just add another .env file into the client root directory.

##### MongoDB #####

I named the username and password variables as MONGODB_USERNAME and MONGODB_PASSWORD. You can change it as you like in _index.js_ file

##### Token for JsonWebToken #####

I named the token variable as JWT_TOKEN. You can change it as you like in _users.js_ (server > src > routes) file
