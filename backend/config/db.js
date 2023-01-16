import { Sequelize } from "sequelize";

const dbInstance = new Sequelize({
    host: "localhost",
    port: 8886,
    username: "root",
    password: "root",
    database: "db_eventus",
    dialect: "mysql",
});

export { dbInstance };