import { UserModel } from '../models/user.js'
import { LocationModel } from '../models/location.js'
import pkg from 'validator'
import multer from 'multer'
import path from 'path' 
const { isEmail } = pkg // https://www.npmjs.com/package/validator

// POST - Create a new user, just need name, surname, username, email, password, verify if username already exists, verify if email already exists and verify if email is valid email, crypt password and save user in database 
export const createAccount = async (req, res) => {
    const { name, surname, username, email, password } = req.body
    const user = await UserModel.findOne({ where: { username: username } }) // Verify if username already exists
    const userEmail = await UserModel.findOne({ where: { email: email } }) // Verify if email already exists
    const validEmail = isEmail(email) // Verify if email is valid email 
    if (user) {
        res.status(400).send('Username already exists') 
    } else if (userEmail) {
        res.status(400).send('Email already exists')
    } else if (!validEmail) {
        res.status(400).send('Email is not valid')
    } else {
        const newUser = await UserModel.create({ name, surname, username, email, password })
        res.status(201).send(newUser)
    }
}


// GET - Get all users
export const getAllUsers = async (req, res) => {
    const users = await UserModel.findAll()
    res.status(200).send(users)
}

//  Image Upload

// 2. Set up storage engine for multer
export const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})


// 3. Set up multer to upload the image
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
}).single('profilePicture')






