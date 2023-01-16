import { UserModel } from '../models/user.js'
//  Image Upload

// 1. Import multer
import multer from 'multer'
import path from 'path'



// 2. Set up multer, save image into frontend/public/images/uploads
export const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})


// 3. Set up multer, save image into frontend/public/images/uploads
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

// 4. Create a new user
export const createUser = async (req, res) => {

    let info = {
        image: req.file.path,
        imageType: path.parse(req.file.originalname).ext
    }

    const product = await UserModel.create(info)
    res.status(200).send(product)
    console.log(product)

}

// 5. Get all users
export const getAllUsers = async (req, res) => {
    const users = await UserModel.findAll()
    res.status(200).send(users)
}






