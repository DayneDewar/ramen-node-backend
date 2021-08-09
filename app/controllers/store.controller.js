const db = require('../models');
const Store = db.stores;
const User = db.users;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return
    }

    const store = {
        name: req.body.name,
        address: req.body.address,
        website: req.body.website,
        image: req.body.image,
        lat: req.body.lat,
        long: req.body.long,
        rating: req.body.rating ? req.body.rating : 3
    };

    Store.create(store)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating the Store."
            });
        });
};

exports.findAll = (req, res) => {
    const name = req.query.name;
    let condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
    
    Store.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while finding Stores." 
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    
    Store.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while finding Store with id=" + id
            });
        });
}

exports.update = (req, res) => {
    const id = req.params.id;

    Store.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Store successfully updated."
                }); 
            } else {
                res.send({
                    message: `Cannot update Store with id=${id}. Maybe Store was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error updating Store with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Store.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Store was deleted succesfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Store with id=${id}. Maybe Store was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Could not delete Store with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {

}

exports.findByName = (req, res) => {

}