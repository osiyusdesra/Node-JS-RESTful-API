const express = require('express');
const welcome = require('./welcome');
const engineer = require('./engineer');
const company = require('./company');
const user = require('./user');
const jwt = require('jsonwebtoken');
const connection = require('./connect');


const Router = express.Router();

const verfyToken = function(req, res, next) {

    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearToken = bearer[1];
        req.token = bearToken;
        next();

    } else {
        //FORBIDDEN
        res.sendStatus(403);
    };
};

Router.get('/welcome', welcome.getWelcome); //localhost:1234/welcome

// CRUD Engineer
Router.get('/engineer', verfyToken, engineer.allEngineers); //localhost:1234/engineer
Router.post('/engineer', verfyToken, engineer.addEngineer); //localhost:1234/engineer
Router.put('/engineer', verfyToken, engineer.updateEngineer); //localhost:1234/engineer
Router.delete('/engineer', verfyToken, engineer.deleteEngineer); //localhost:1234/engineer

// CRUD Company
Router.get('/company', company.allCompany); //localhost:1234/company
Router.post('/company', company.addCompany); //localhost:1234/company
Router.put('/company', company.updateCompany); //localhost:1234/company
Router.delete('/company', company.deleteCompany); //localhost:1234/company

// SEARCH ENGINEER
Router.get('/engineer/search', engineer.findEngineer); //localhost:1234/engineer/search
Router.get('/engineer/sortby', engineer.sortEngineer); //localhost:1234/engineer/sortby
Router.get('/engineer/page', engineer.pageEngineer); //localhost:1234/engineer/page


//JWT
Router.post('/signup', user.addNewUser);
Router.post('/signin', user.userLogin);


module.exports = Router;