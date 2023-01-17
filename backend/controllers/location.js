import { LocationModel } from "../models/location.js";
import axios from "axios";

class LocationController {
    async createLocation(req, res) {
        try {
            // Faz a requisição à API para obter os dados das cidades
            const response = await axios.get('https://json.geoapi.pt/municipios');

            // Itera sobre as cidades e salva apenas o nome na tabela location
            for (let i = 0; i < response.data.length; i++) {
                const city = response.data[i];
                await LocationModel.create({
                    description: city
                });
            }

            res.status(200).send({ message: 'Cidades salvas com sucesso' });
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: 'Erro ao salvar as cidades' });
        }
    }
}

export default new LocationController();