import { Sequelize } from "sequelize";
import { dbInstance } from "../config/db.js";
import { LocationModel } from "./location.js";
import { CategoryModel } from "./category.js";


const EventModel = dbInstance.define(
    "event" /* table name */,
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        locationId: {
            type: Sequelize.INTEGER,
            references: {
                model: LocationModel,
                key: 'id'
            }
        },
        adress: {
            type: Sequelize.STRING,
            allowNull: false
        },
        startDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        endDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        image: {
            type: Sequelize.STRING,
            defaultValue: "default.png"
        },
        categoryId: {
            type: Sequelize.INTEGER,
            references: {
                model: CategoryModel,
                key: 'id'
            }
        }
    }, {
    timestamps: false
}
)

EventModel.belongsTo(LocationModel, {
    foreignKey: 'locationId'
})

EventModel.belongsTo(CategoryModel, {
    foreignKey: 'categoryId'
})

export { EventModel }
