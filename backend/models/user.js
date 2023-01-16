import Sequelize from 'sequelize';
import { dbInstance } from '../config/db.js'

const UserModel = dbInstance.define(
    'user' /* table name */,
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        image: {
            type: Sequelize.STRING,
        }
    }
)

export {UserModel};