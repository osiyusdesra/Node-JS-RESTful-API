const connection = require('./connect');
const response = require('./response');
const jwt = require('jsonwebtoken');
const verfyToken = require('./user');

// Read
exports.allEngineers = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, decoded) => {
        if (err) {
            res.sendStatus(403);
        } else {
            connection.query('SELECT * FROM engineer', function(err, rows, fields) {
                if (err) {
                    console.log(err);
                } else {
                    response.ok(rows, res);
                }
            });
        }
    });
};
// Create
exports.addEngineer = function(req, res) {

    console.log(req);
    jwt.verify(req.token, 'secretkey', (err, decoded) => {
        if (err) {
            res.sendStatus(403);
        } else {
            let name = req.body.name;
            let description = req.body.description;
            let skills = req.body.skills;
            let address = req.body.address;
            let dateofbirth = req.body.dateofbirth;
            let portfolio = req.body.portfolio;
            let datacreated = new Date;
            let dataupdated = new Date;

            let sql = 'INSERT INTO engineer (name, description, skills, address, dateofbirth, portfolio, datacreated, dataupdated) VALUES (?,?,?,?,?,?,?,?)';

            connection.query(sql, [name, description, skills, address, dateofbirth, portfolio, datacreated, dataupdated], function(err, rows, fields) {
                if (err) {
                    console.log(err);
                } else {
                    response.ok('New Data has been added', res)
                }
            });
        }
    });
};

// Update
exports.updateEngineer = function(req, res) {

    console.log(req);
    jwt.verify(req.token, 'secretkey', (err, decoded) => {
        if (err) {
            res.sendStatus(403);
        } else {

            let name = req.body.name;
            let description = req.body.description;
            let skills = req.body.skills;
            let address = req.body.address;
            let dateofbirth = req.body.dateofbirth;
            let portfolio = req.body.portfolio;
            // let datacreated = new Date;
            // let dataupdated = new Date;

            let sql = 'UPDATE engineer SET description = ?, skills = ?, address = ?, dateofbirth = ?, portfolio = ? where name = ?';

            connection.query(sql, [description, skills, address, dateofbirth, portfolio, name], function(err, rows, fields) {
                if (err) {
                    console.log(err);
                } else {
                    response.ok('Data has been UPDATED', res)
                }
            });
        }
    });
};


// Delete
exports.deleteEngineer = function(req, res) {

    jwt.verify(req.token, 'secretkey', (err, decoded) => {
        if (err) {
            res.sendStatus(403);
        } else {
            let name = req.body.name;

            let sql = 'DELETE FROM `engineer` WHERE `name`=? ';

            connection.query(sql, [name], function(err, rows, fields) {
                if (err) {
                    console.log(err);
                } else {
                    response.ok('Data has been deleted!', res)
                }
            });
        }
    });
};


exports.findEngineer = function(req, res) {
    let name = req.query.name;
    let skills = req.query.skills;

    if (name != undefined && skills != undefined) {
        let sql = `SELECT * FROM engineer WHERE name LIKE '%${name}%' AND skills LIKE '%${skills}%'`;

        connection.query(sql, [name, skills], function(err, rows, fields) {
            if (err) {
                throw err;
            } else {
                response.ok(rows, res)
            }
        });
    } else if (name != undefined) {
        let sql = `SELECT * FROM engineer WHERE name LIKE '%${name}%'`;

        connection.query(sql, [name, skills], function(err, rows, fields) {
            if (err) {
                throw err;
            } else {
                response.ok(rows, res)
            }
        });
    } else if (skills != undefined) {
        let sql = `SELECT * FROM engineer WHERE skills LIKE '%${skills}%'`;

        connection.query(sql, [name, skills], function(err, rows, fields) {
            if (err) {
                throw err;
            } else {
                response.ok(rows, res)
            }
        });
    }

};


// Sort by 
exports.sortEngineer = function(req, res) {
    let order = req.query.order;

    connection.query(`SELECT * FROM engineer ORDER BY ${order}`, function(err, rows, fields) {
        if (err) {
            console.log(err);
        } else {
            response.ok(rows, res);
        }
    });
};


// Pagination
exports.pageEngineer = function(req, res) {

    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);
    let offset = limit * (page - 1);
    connection.query(`SELECT * FROM engineer LIMIT ${limit} OFFSET ${offset}`, function(err, rows, fields) {
        if (err) {
            console.log(err);
        } else {
            response.ok(rows, res);
        }
    });
};