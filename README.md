# Node-JS-Restfull-API

Node JS is an open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside of a browser (source : https://en.wikipedia.org/wiki/Node.js).

A RESTful API is an application program interface (API) that uses HTTP requests to GET, PUT, POST and DELETE data (source : https://searchapparchitecture.techtarget.com/definition/RESTful-API).

This project use express JS as Node JS framework to designes RESTful API for Hiring Channel-App.

To run this project, you need tools bellow:

- Node JS
  you can download at : https://nodejs.org/en/download/
- MySQL
  You can install MysqL by installing xampp where you can download at : https://www.apachefriends.org/download.html
- Postman
  You can download at https://www.getpostman.com/downloads/
  
  
Steps to create RESTful API Hiring Channel-App :

1. Run Node JS and install dependencies bellow :
        bcryptjs
        body-parser
        dotenv
        express
        jsonwebtoken
        morgan
        mysql

2. Create Database with MySQL

3. Code CRUD

4. Test CRUD on Postman by running
- (GET) https://localhost:1234/welcome
- (GET || POST || PUT || DELETE) https://localhost:1234/engineer
- (GET || POST || PUT || DELETE) https://localhost:1234/company
- (POST) https://localhost:1234/signup
- (POST) https://localhost:1234/siginin
