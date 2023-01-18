import { UserModel } from '../models/user.js'
import { LocationModel } from '../models/location.js'
import pkg from 'validator'
import multer from 'multer'
import path from 'path'
const { isEmail } = pkg // https://www.npmjs.com/package/validator
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


// POST - Create a new user, just need name, surname, username, email, password, verify if username already exists, verify if email already exists and verify if email is valid email, crypt password and save user in database 
export const createAccount = async (req, res) => {
    const { name, surname, username, email, password } = req.body
    const user = await UserModel.findOne({ where: { username: username } }) // Verify if username already exists
    const userEmail = await UserModel.findOne({ where: { email: email } }) // Verify if email already exists
    const validEmail = isEmail(email) // Verify if email is valid email 
    if (user) {
        res.status(400).send('Este username já está a ser utilizado')
    } else if (userEmail) {
        res.status(400).send('Este email já está a ser utilizado')
    } else if (!validEmail) {
        res.status(400).send('Por favor, introduza um email válido')
    } else {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        // const joinedDate = moment().format('DD/MM/YYYY');
        const newUser = await UserModel.create({ name, surname, username, email, password: hashedPassword });

        // create and assign a token
        const token = jwt.sign({ _id : newUser.id }, process.env.TOKEN_SECRET)

        res.status(201).send({ newUser, token });
    }
}

// GET - Get all users, dont return, password, profilePicture and replace locationId with locationName, if locationId is null, return null
export const getAllUsers = async (req, res) => {
    const users = await UserModel.findAll({ attributes: { exclude: ['password', 'profilePicture'] } })
    const usersWithLocation = await Promise.all(users.map(async (user) => {
        if (user.locationId) {
            const location = await LocationModel.findOne({ where: { id: user.locationId } })
            return { ...user.dataValues, locationName: location.name }
        } else {
            return { ...user.dataValues, locationName: null }
        }
    }))
    res.status(200).send(usersWithLocation)
}


// GET - Get user by usernaem from req body and return user, dont return password and profilePicture, if locationId is null, return null if not, return locationName, if req body is empty, return message to fill username field 
export const getUserByUsername = async (req, res) => {
    const { username } = req.body
    if (username) {
        const user = await UserModel.findOne({ where: { username: username }, attributes: { exclude: ['password', 'profilePicture'] } })
        if (user) {
            if (user.locationId) {
                const location = await LocationModel.findOne({ where: { id: user.locationId } })
                res.status(200).send({ ...user.dataValues, locationName: location.name })
            } else {
                res.status(200).send({ ...user.dataValues, locationName: null })
            }
        } else {
            res.status(404).send('User not found')
        }
    } else {
        res.status(400).send('Por favor, preencha o campo username')
    }
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






