module.exports = {
    HOST: "localhost",
    USER: "shadow",
    PASSWORD: "",
    DB: "ramen_app_backend",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}; 