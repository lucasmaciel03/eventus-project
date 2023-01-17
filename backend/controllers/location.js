import { LocationModel } from "../models/location.js";
import axios from "axios";

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


