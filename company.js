const connection = require('./connect');
const response = require('./response');

// Read
exports.allCompany = function(req, res) {
    let sql = 'SELECT * FROM company';

    connection.query(sql, function(err, rows, fields) {
        if (err) {
            throw err;
        } else {
            response.ok(rows, res);
        }
    });
};

// CREATE
exports.addCompany = function(req, res) {
    console.log(req);
    let name = req.body.name;
    let logo = req.body.logo;
    let location = req.body.location;
    let description = req.body.description;

    let sql = 'INSERT INTO company (name, logo, location, description) VALUES (?,?,?,?)';

    connection.query(sql, [name, logo, location, description], function(err, rows, fields) {
        if (err) {
            console.log(err);
        } else {
            response.ok('New Company has been added!', res)
        }
    });
};

// UPDATE
exports.updateCompany = function(req, res) {

    let name = req.body.name;
    let logo = req.body.logo;
    let location = req.body.location;
    let description = req.body.description;

    let sql = 'UPDATE `company` SET `logo`=?, `location`=?, `description`=? WHERE `name`=?';

    connection.query(sql, [logo, location, description, name], function(err, rows, fields) {
        if (err) {
            console.log(err);
        } else {
            response.ok('Company data has been UPDATED!', res)
        }
    });
};

// DELETE
exports.deleteCompany = function(req, res) {

    let sql = 'DELETE FROM `company` WHERE `name`=?';

    connection.query(sql, [req.body.name], function(err, rows, fields) {
        if (err) {
            throw err;
        } else {
            response.ok('Company Data has been DELETED!', res)
        }
    });
};