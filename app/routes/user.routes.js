module.exports = app => {
    const users = require('../controllers/user.controller.js');

    let router = require('express').Router();

    router.post('/', users.create);

    router.get('/', users.allUsers);

    router.post('/login', users.login);

    router.get('/:id', users.findOne);

    router.put('/:id', users.update);

    app.use('/api/users', router);
};
