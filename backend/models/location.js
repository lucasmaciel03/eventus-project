import Sequelize from 'sequelize';
import { dbInstance } from '../config/db.js'

const LocationModel = dbInstance.define(
    'location' /* table name */,
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        description :{
            type: Sequelize.STRING,
        }
    }, {
    timestamps: false // disable the default timestamp fields (createdAt and updatedAt)
});


export { LocationModel };