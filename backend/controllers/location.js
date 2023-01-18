import { LocationModel } from "../models/location.js";
import Sequelize from "sequelize";
import axios from "axios";

// POST - Add a new location
export const addlocation = async (req, res) => {
    try {
        // Make a request to the API to get the data of the cities
        const response = await axios.get('https://json.geoapi.pt/municipios');

        // Iterate over the cities and save only the name in the location table
        for (let i = 0; i < response.data.length; i++) {
            const city = response.data[i];
            // Check if the city already exists
            const cityExists = await LocationModel.findOne({ description: city });

            if (!cityExists) {
                await LocationModel.create({
                    description: city
                });
            }
        }

        res.status(200).send({ message: 'Cidades salvas com sucesso' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Erro ao salvar as cidades' });
    }
}

// GET - Get all locations
export const getLocations = async (req, res) => {
    try {
        const locations = await LocationModel.findAll();
        res.status(200).json(locations);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao obter cidades' });
    }
}

// GET - Get a location by description, the request is made by the user typing the name of the city, user dont need to type the exact name of the city to get the results 
export const getLocationByDescription = async (req, res) => {
    try {
        const locations = await LocationModel.findAll({
            where: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('description')), {
                [Sequelize.Op.like]: `%${req.body.description.toLowerCase()}%` // The user can type the name of the city in lowercase or uppercase
            })
        });
        res.status(200).send(locations);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}


