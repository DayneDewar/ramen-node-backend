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