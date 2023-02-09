import { Sequelize } from 'sequelize';
import { dbInstance } from "../config/db.js";
import { UserModel } from "./user.js";
import { EventModel } from "./event.js";

const EventCommentsModel = dbInstance.define(
    "event_comments" /* table name */,
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: Sequelize.INTEGER,
            references: {
                model: UserModel,
                key: "id"
            }
        },
        eventId: {
            type: Sequelize.INTEGER,
            references: {
                model: EventModel,
                key: "id"
            }
        },
        comment: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
    timestamps: false /* disable created_at and updated_at */
});


EventCommentsModel.belongsTo(UserModel, {
    foreignKey: "userId"
});


EventCommentsModel.belongsTo(EventModel, {
    foreignKey: "eventId"
});

export { EventCommentsModel };

