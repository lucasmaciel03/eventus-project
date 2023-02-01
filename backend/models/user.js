import Sequelize from 'sequelize';
import { dbInstance } from '../config/db.js'
import { LocationModel } from './location.js';
import moment from 'moment';


const UserModel = dbInstance.define(
    
    'user' /* table name */,
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        surname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        profilePicture: {
            type: Sequelize.STRING,
            defaultValue: "default.png"
        },
        locationId: {
            type: Sequelize.INTEGER,
            references: {
                model: LocationModel,
                key: 'id'
            }
        },
        birthDate: {
            type: Sequelize.DATE,
        },
        joinedDate: {
            type: Sequelize.STRING,
            defaultValue: moment.utc().format('DD/MM/YYYY')
        },
    }, {
    timestamps: false
}
)

UserModel.belongsTo(LocationModel, {
    foreignKey: 'locationId',
    as: 'location'
});
LocationModel.hasMany(UserModel, {
    foreignKey: 'locationId',
    as: 'users'
});

export { UserModel };
