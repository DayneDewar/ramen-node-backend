const db = require('../models');
const Store = db.stores;
const User = db.users;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.email) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return
    }

    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    }

    User.create(user)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating the User."
            });
        });
}

exports.allUsers = (req, res) => {
    const firstname = req.query.firstname;
    let condition = firstname ? { firstname: { [Op.iLike]: `%${firstname}%` } } : null;
    
    User.findAll({ where: condition, include: Store })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while finding Users." 
            });
        });
}

exports.findOne = (req, res) => {
    const id = req.params.id

    User.findByPk(id)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while finding User with id=" + id
            })
        })
}

exports.login = (req, res) => {
    const username = req.body.email
    const pass = req.body.password

    User.findOne({where: {email: username}})
        .then(data => {
            if (data.password == pass) {
                res.send(data)
            } else {
                res.status(401).send({
                    message: "Incorrect Password, please try again!"
                })
            }
        })
        .catch(err => {
            res.status(401).send({
                message: "Incorrect Username, please try again!"
            })
        })

}

exports.update = (req, res) => {
    const id = req.params.id

    User.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "User successfully updated."
            }); 
        } else {
            res.send({
                message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error updating User with id=" + id
        })
    })

}

exports.addVisit = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
        .then(id)
}