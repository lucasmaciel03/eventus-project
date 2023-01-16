import { Sequelize } from "sequelize";

const dbInstance = new Sequelize({
    host: "localhost",
    port: 8886,
    username: "root",
    password: "root",
    database: "db_eventus",
    dialect: "mysql",

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    } 
});

export { dbInstance };