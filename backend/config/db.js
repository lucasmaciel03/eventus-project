import { Sequelize } from "sequelize";

const dbInstance = new Sequelize({
    host: "localhost",
    port: 8886,
    username: "root",
    password: "",
    database: "db_eventus",
    dialect: "mysql",
    
    pool: {
        min: 0,
        max: 5,
        acquire: 30000,
        idle: 10000
    }  // pool configuration used to pool database connections
});

export { dbInstance };