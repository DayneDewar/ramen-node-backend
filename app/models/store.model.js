module.exports = (sequelize, Sequelize) => {
    const Store = sequelize.define("store", {
        name: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        website: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.STRING
        },
        lat: {
            type: Sequelize.FLOAT
        },
        long: {
            type: Sequelize.FLOAT
        },
        rating: {
            type: Sequelize.INTEGER
        }
    });

    return Store;
}