import { UserModel } from '../models/user.js'
import { LocationModel } from '../models/location.js'
import pkg from 'validator'
import multer from 'multer'
import path from 'path'
const { isEmail } = pkg // https://www.npmjs.com/package/validator
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



// POST - Create a new user
export const createAccount = async (req, res) => {
    const { name, surname, username, email, password } = req.body;
    if (!name || !surname || !username || !email || !password) { // Prevent crash if user doesn't fill all fields
        return res.status(400).send({ message: 'Por favor, preencha todos os campos' });
    }
    if (!username) {
        return res.status(400).send({ message: 'Por favor, preencha o campo username' });
    }
    const user = await UserModel.findOne({ where: { username: username } }); // Verify if username already exists
    const userEmail = await UserModel.findOne({ where: { email: email } }); // Verify if email already exists
    const validEmail = isEmail(email); // Verify if email is valid email 
    if (user) {
        return res.status(400).send({ message: 'Este username já está a ser utilizado' });
    } else if (userEmail) {
        return res.status(400).send({ message: 'Este email já está a ser utilizado' });
    } else if (!validEmail) {
        return res.status(400).send({ message: 'Por favor, introduza um email válido' });
    } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // const joinedDate = moment().format('DD/MM/YYYY');
        const newUser = await UserModel.create({ name, surname, username, email, password: hashedPassword });

        // create and assign a token
        const token = jwt.sign({ _id: newUser.id }, process.env.TOKEN_SECRET);

        return res.status(201).send({ newUser, token });
    }
}

// POST - Login controller
export const login = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password ){
        return res.status(400).send({message: 'Por favor, preencha todos os campos'});
    }
    const user = await UserModel.findOne({ where: { username: username } })
    if (!user) {
        res.status(400).send('Por favor, registe-se')
    } else {
        const validPass = await bcrypt.compare(password, user.password)
        if (!validPass) {
            res.status(400).send('Por favor, tente novamente')
        } else {
            // create and assign a token
            const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET)
            res.status(200).send({ message: 'Bem-vindo', token })
        }
    }
}

// GET - Get all users
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


// GET - Get user by username
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






