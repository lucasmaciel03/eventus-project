import { Sequelize } from 'sequelize';
import { dbInstance } from '../config/db.js';
import { UserModel } from './user.js';
import { EventModel } from './event.js';


const EventHostModel = dbInstance.define(
    'event_host' /* table name */,
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
                key: 'id'
            }
        },
        eventId: {
            type: Sequelize.INTEGER,
            references: {
                model: EventModel,
                key: 'id'
            }
        }
    }, {
    timestamps: false
}
)

EventHostModel.belongsTo(UserModel, {
    foreignKey: 'userId'
})

EventHostModel.belongsTo(EventModel, {
    foreignKey: 'eventId'
})

export { EventHostModel };
