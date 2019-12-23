const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const connection = require('./connect');
const userMiddleware = require('./middlewareUser');


router.post('/sign-up', userMiddleware.validateRegister, (req, res, next) => {
    connection.query(
        `SELECT * FROM users WHERE username = ${connection.escape(
        req.body.username
      )};`,
        (err, result) => {
            if (result.length) {
                return res.status(409).send({
                    msg: 'This username is already in use!'
                });
            } else {
                // username is available
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).send({
                            msg: err
                        });
                    } else {
                        // has hashed pw => add to database
                        connection.query(
                            `INSERT INTO users (username, email, password) VALUES ('${connection.escape(req.body.username)}', ${connection.escape(
                  req.body.email
                )}, ${connection.escape(hash)})`,
                            (err, result) => {
                                if (err) {
                                    throw err;
                                    return res.status(400).send({
                                        msg: err
                                    });
                                }
                                return res.status(201).send({
                                    msg: 'Registered!'
                                });
                            }
                        );
                    }
                });
            }
        }
    );
});

router.post('/login', (req, res, next) => {});
router.get('/secret-route', (req, res, next) => {
    res.send('This is the secret content. Only logged in users can see that!');
});
module.exports = userRouter;