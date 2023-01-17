import { UserModel } from '../models/user.js'
import { LocationModel } from '../models/location.js'
import pkg from 'validator'
import multer from 'multer'
import path from 'path' 
const { isEmail } = pkg // https://www.npmjs.com/package/validator

// POST - Create a new user
export const createUser = async (req, res) => {
    let info = {
        username: req.body.username,
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password,
        locationId: req.body.locationId,
        birthDate: req.body.birthDate,
        profilePicture: req.file.filename
    }

    // verify if username already exists, verify if email is valid, verify if locationID exists in the database 
    const user = await UserModel.findOne({
        where: {
            username: info.username || '' // if username is null, set it to empty string to avoid error in the query
        }
    })

    const location = await LocationModel.findOne({
        where: {
            id: info.locationId || '' // if locationId is null, set it to empty string to avoid error in the query
        }
    })

    if (user) {
        res.status(400).send({
            message: "Username already exists"
        })
    }
    else if (!isEmail(info.email)) {
        res.status(400).send({
            message: "Email is not valid"
        })
    }
    else if (!location) {
        res.status(400).send({
            message: "Location does not exist"
        })
    }
    else {
        const newUser = await UserModel.create(info)
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






