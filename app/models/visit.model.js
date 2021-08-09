module.exports = (sequelize, Sequelize) => {
    const Visit = sequelize.define("visit", {
        user_id: {
            type: Sequelize.INTEGER
        },
        store_id: {
            type: Sequelize.INTEGER
        }
    })

    return Visit;
}