import { CategoryModel } from '../models/category.js';
import multer from 'multer'
import path from 'path'
import fs from 'fs'

// POST - Add a new category
export const addCategory = async (req, res) => {
    try {
        const category = await CategoryModel.findOne
            ({ description: req.body.description });
        {
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

export const updateImage = async (req, res) => {
    try {
        const { id } = req.params
        const categoryExist = await CategoryModel.findOne({ where: { id: id } })
        if (categoryExist) {
            if (categoryExist.image !== 'default.png') {
                fs.unlinkSync(`uploads/categories/${categoryExist.image}`)
            }
            await CategoryModel.update({ image: req.file.filename }, { where: { id: id } })
            res.status(200).send({ message: 'Foto de perfil atualizada com sucesso' })
        } else {
            res.status(404).send({ message: 'User not found' })
        }
    } catch (error) {
        res.status(500).send({ message: 'Error updating profile picture', error: error.message });
    }
}

//  Image Upload

// Set up storage engine for multer
export const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/categories')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})


// Set up multer to upload the image
export const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))

        if (mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('image')

