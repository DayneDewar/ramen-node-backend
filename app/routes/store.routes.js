module.exports = app => {
    const stores = require('../controllers/store.controller.js');

    let router = require('express').Router();

    router.post('/', stores.create);

    router.get('/', stores.findAll);

    router.get('/:id', stores.findOne);

    router.put('/:id', stores.update);

    router.delete('/:id', stores.delete);

    app.use('/api/stores', router)
};