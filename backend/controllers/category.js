import { CategoryModel } from '../models/category.js';

// POST - Add a new category
export const addCategory = async (req, res) => {
    try {
        const category = await CategoryModel.findOne
            ({ description: req.body.description });
        if (category) {
            res.status(400).json({ message: 'Categoria já existe' });
        }
        else {
            await CategoryModel.create(req.body);
            res.status(200).json({ message: 'Categoria criada com sucesso' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao criar categoria' });
    }
}

// GET - Get all categories
export const getCategories = async (req, res) => {
    try {
        const categories = await CategoryModel.findAll();
        res.status(200).json(categories);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao obter categorias' });
    }
}
