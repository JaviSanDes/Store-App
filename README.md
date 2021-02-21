# E-commerce App
This E-commerce is a Full Stack MERN App that simulate a grocery app allowing you to create an account, log-in, purchase, check your purchase history and manage your account.

DEMO  
----  
[E-commerce Live-Demo](https://e-commerce-mernapp.herokuapp.com/).

![Texto alternativo](/Capture.PNG)

Tools
-----
Key tools used in this project are:
- React
- Redux
- SCSS
- React Router
- Bootstrap
- WebPack
- Babel
- Axios
- NodeJS
- ExpressJS
- MongoDB
- Mongoose
- JWT

Installation  
------------  
Execute the following command on your terminal to install all the needed packages:  

    npm install  
    cd client
    npm install

Start the React App on development, under client directory:  

    npm run start

The application will start automatically in your browser on http://localhost:3000/

To Build the react app to a production mode execute:  

    npm run build

Start express API, under main directory:

    npm start

Environment variables  
------------  
The following environment variables must be set in order to launch the server:
- db: url pointing to the mongoDB server.
- store_jwtPrivateKey: private key to decode passwords.
- NODE_ENV: if it set in 'production' it will serve the server in porduction mode.

DB DATA
------------
- Upload ./data/products.json on your mongoDB

Copyright and license  
---------------------  

The MIT License (MIT). Please see License File for more information.
