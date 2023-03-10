import Sequelize from 'sequelize';
import { dbInstance } from '../config/db.js'

const CategoryModel = dbInstance.define(
    'category' /* table name */,
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        image: {
            type: Sequelize.STRING,
            defaultValue: 'default.png'
            
        },
        description: {
            type: Sequelize.STRING,
        }
    }, {
    timestamps: false // disable the default timestamp fields (createdAt and updatedAt)
}
)

export { CategoryModel };