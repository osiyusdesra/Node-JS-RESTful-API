const connection = require('./connect');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// Regist a user
exports.addNewUser = function(req, res, next) {
    let username = req.body.username;
    let email = req.body.email;
    let password = bcrypt.hashSync(req.body.password);

    let sql = 'SELECT username FROM user WHERE username=?';

    connection.query(sql, [username], function(err, rows) {
        if (err) {
            res.json({ "Error": true, "Message": "Error executing MySQL query" });
        } else {

            if (rows) {

                let lqs = 'INSERT INTO  user (username, email, password) VALUES (?,?,?)';

                connection.query(lqs, [username, email, password], function(err, rows) {
                    if (err) {
                        res.json({ "Error": true, "Message": "Username has already registered" });
                    } else {
                        res.json({ "Error": false, "Message": "Yayy your success regist your username" });
                    }
                });

            }
        }
    });


};


// User Login
exports.userLogin = function(req, res) {

    let username = req.body.username;
    let password = bcrypt.compare(req.body.password);

    let sql = 'SELECT * FROM user WHERE username=?';

    connection.query(sql, [username, password], function(err, rows) {

        if (!err) {
            if (rows.length > 0) {
                if (password) {
                    token = jwt.sign(JSON.parse(JSON.stringify(rows[0])), 'secretkey', {
                        expiresIn: 3600
                    });
                    res.json({
                        "success": true,
                        "message": "Token generated",
                        "token": token,
                        "Username": username
                    });

                } else {
                    res.json({
                        "success": false,
                        "message": "Can not log in",
                        "Username": username
                    });

                }
            }
        } else
            console.log(err);

    });
}