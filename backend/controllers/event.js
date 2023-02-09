import { EventModel } from '../models/event.js';
import { LocationModel } from '../models/location.js';
import { CategoryModel } from '../models/category.js';
import { UserModel } from '../models/user.js';
import { EventHostModel } from '../models/event_host.js';
import { EventLikesModel } from '../models/event_likes.js';
import { EventCommentsModel } from '../models/event_comments.js';
import multer from 'multer'
import path from 'path'
import fs from 'fs'

// POST - Create a new event by id, and add it to the database, before create event, check if the location and category exist, user send locationName and categoryName we save the location id and category id, dont accept in title, description, adress, empty spaces, undefined, null, and check if the date is valid, after create event, add into event_host table, user id and event id of the user who created the event, this controller never can crash, if something goes wrong, it will return a message to the user with the error if everything goes well, it will return a message to the user with the event created add locationName, categoryName, and userId in the body
export const createEvent = async (req, res) => {
    try {
        const { title, description, locationName, adress, startDate, endDate, categoryName } = req.body
        const userId = req.params.id
        const location = await LocationModel.findOne({ where: { description: locationName } })
        const category = await CategoryModel.findOne({ where: { description: categoryName } })
        const user = await UserModel.findOne({ where: { id: userId } })
        if (!location) {
            return res.status(400).json({ message: 'Location not found' })
        }
        if (!category) {
            return res.status(400).json({ message: 'Category not found' })
        }
        if (!user) {
            return res.status(400).json({ message: 'User not found' })
        }
        if (!title || !description || !adress || !startDate || !endDate) {
            return res.status(400).json({ message: 'Please fill all the fields' })
        }
        if (title.trim() === '' || description.trim() === '' || adress.trim() === '') {
            return res.status(400).json({ message: 'Please fill all the fields' })
        }
        if (startDate > endDate) {
            return res.status(400).json({ message: 'Please enter a valid date' })
        }
        const event = await EventModel.create({
            title,
            description,
            locationId: location.id,
            adress,
            startDate,
            endDate,
            image: req.file.filename,
            categoryId: category.id
        })

        await EventHostModel.create({
            userId: user.id,
            eventId: event.id
        })
        return res.status(201).json({ message: 'Event created', event })
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong', error })
    }
}

// GET - By id, get all the events created by the user, if the user does not exist, return a message to the user, if the user exists, return all the events created by the user replace the location id and category id with the location name and category name, and return the events
export const getEventsByUserId = async (req, res) => {
    try {
        const userId = req.params.id
        const user = await UserModel.findOne({ where: { id: userId } })
        if (!user) {
            return res.status(400).json({ message: 'User not found' })
        }
        const events = await EventHostModel.findAll({ where: { userId: userId } })
        const eventsId = events.map(event => event.eventId)
        const eventsByUserId = await EventModel.findAll({ where: { id: eventsId } })
        const eventsWithLocationAndCategory = await Promise.all(eventsByUserId.map(async event => {
            const location = await LocationModel.findOne({ where: { id: event.locationId } });
            const category = await CategoryModel.findOne({ where: { id: event.categoryId } });
            return {
              ...event.dataValues,
              locationName: location.description,
              categoryName: category.description,
            };
          }));
        return res.status(200).json({ message: 'Events found', eventsWithLocationAndCategory })
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong', error })
    }
}

// GET - By category id, if no category id is sent, return all the events, if the category id is sent, return all the events that belong to that category, replace the location id and category id with the location name and category name, and return the events if not found any event, return a message to the user
export const getEventsByCategoryId = async (req, res) => {
    try {
        const categoryId = req.params.id
        if (!categoryId) {
            const events = await EventModel.findAll()
            const eventsWithLocationAndCategory = await Promise.all(events.map(async event => {
                const location = await LocationModel.findOne({ where: { id: event.locationId } });
                const category = await CategoryModel.findOne({ where: { id: event.categoryId } });
                return {
                    ...event.dataValues,
                    locationName: location.description,
                    categoryName: category.description,
                };
            }));
            return res.status(200).json({ message: 'Events found', eventsWithLocationAndCategory })
        }
        const events = await EventModel.findAll({ where: { categoryId: categoryId } })
        if (!events) {
            return res.status(400).json({ message: 'Events not found' })
        }
        const eventsWithLocationAndCategory = await Promise.all(events.map(async event => {
            const location = await LocationModel.findOne({ where: { id: event.locationId } });
            const category = await CategoryModel.findOne({ where: { id: event.categoryId } });
            return {
                ...event.dataValues,
                locationName: location.description,
                categoryName: category.description,
            };
        }));
        return res.status(200).json({ message: 'Events found', eventsWithLocationAndCategory })
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong', error })
    }
}

// GET - All the events, replace the location id and category id with the location name and category name, and return the events and the user who created the event just sent name, surname, username, profilePicture check the user id in the event host table 
export const getAllEvents = async (req, res) => {
    try {
        const events = await EventModel.findAll()
        const eventsWithLocationAndCategory = await Promise.all(events.map(async event => {
            const location = await LocationModel.findOne({ where: { id: event.locationId } });
            const category = await CategoryModel.findOne({ where: { id: event.categoryId } });
            const eventHost = await EventHostModel.findOne({ where: { eventId: event.id } })
            const user = await UserModel.findOne({ where: { id: eventHost.userId } })
            return {
                ...event.dataValues,
                locationName: location.description,
                categoryName: category.description,
                user: {
                    name: user.name,
                    surname: user.surname,
                    username: user.username,
                    profilePicture: user.profilePicture
                }
            };
        }));
        return res.status(200).json( eventsWithLocationAndCategory )
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong', error })
    }
}

// POST - Add a new like for the event by id, if the user already liked the event remove the like, if the user did not like the event, add a new like, if the event does not exist, return a message to the user, if the event exists, return the event with the number of likes add the user id and the event id to the event like table 
export const addLike = async (req, res) => {
    try {
        const userId = req.params.id
        console.log('*****************************' + userId)
        const eventId = req.params.eventId
        console.log('*****************************' + eventId)
        const eventData = await EventModel.findOne({ where: { id: eventId } })
        if (!eventData) {
            return res.status(400).json({ message: 'Event not found' })
        }
        const eventLike = await EventLikesModel.findOne({ where: { userId: userId, eventId: eventId } })
        if (eventLike) {
            await EventLikesModel.destroy({ where: { userId: userId, eventId: eventId } })
            const updatedEventData = await EventModel.findOne({ where: { id: eventId } })
            return res.status(200).json({ message: 'Like removed', event: updatedEventData })
        }
        await EventLikesModel.create({ userId: userId, eventId: eventId })
        const updatedEventData = await EventModel.findOne({ where: { id: eventId } })
        return res.status(200).json({ message: 'Like added', event: updatedEventData })
    } catch (error) {
        console.log('------------------------------------------' + error)
        return res.status(500).json({ message: 'Something went wrong', error })
    }
}

// GET - Get al events by user id and category id, if category id equals 1 send all events, if not send all events by category id, verify if user liked the event and send like true or false, if in the event like table the user id and event id match, send like true, if not send like false, replace the location id and category id with the location name and category name, and return the events and the user who created the event just sent name, surname, username, profilePicture check the user id in the event host table return the comments for the event, and the user who created the comment, just sent name, profilePicture, username, and the comment
export const getEventsByUserIdAndCategoryId = async (req, res) => {
    try {
        const userId = req.params.id
        const categoryId = req.params.categoryId
        if (categoryId == 1) {
            const events = await EventModel.findAll()
            const eventsWithLocationAndCategory = await Promise.all(events.map(async event => {
                const location = await LocationModel.findOne({ where: { id: event.locationId } });
                const category = await CategoryModel.findOne({ where: { id: event.categoryId } });
                const eventHost = await EventHostModel.findOne({ where: { eventId: event.id } })
                const user = await UserModel.findOne({ where: { id: eventHost.userId } })
                const eventLike = await EventLikesModel.findOne({ where: { userId: userId, eventId: event.id } })
                const comments = await EventCommentsModel.findAll({ where: { eventId: event.id } })
                const commentsWithUser = await Promise.all(comments.map(async comment => {
                    const user = await UserModel.findOne({ where: { id: comment.userId } })
                    return {
                        ...comment.dataValues,
                        user: {
                            name: user.name,
                            surname: user.surname,
                            username: user.username,
                            profilePicture: user.profilePicture
                        }
                    }
                }))
                return {
                    ...event.dataValues,
                    locationName: location.description,
                    categoryName: category.description,
                    user: {
                        name: user.name,
                        surname: user.surname,
                        username: user.username,
                        profilePicture: user.profilePicture
                    },
                    like: eventLike ? true : false,
                    comments: commentsWithUser
                };
            }));
            return res.status(200).json( eventsWithLocationAndCategory )
        }
        const events = await EventModel.findAll({ where: { categoryId: categoryId } })
        const eventsWithLocationAndCategory = await Promise.all(events.map(async event => {
            const location = await LocationModel.findOne({ where: { id: event.locationId } });
            const category = await CategoryModel.findOne({ where: { id: event.categoryId } });
            const eventHost = await EventHostModel.findOne({ where: { eventId: event.id } })
            const user = await UserModel.findOne({ where: { id: eventHost.userId } })
            const eventLike = await EventLikesModel.findOne({ where: { userId: userId, eventId: event.id } })
            const comments = await EventCommentsModel.findAll({ where: { eventId: event.id } })
            const commentsWithUser = await Promise.all(comments.map(async comment => {
                const user = await UserModel.findOne({ where: { id: comment.userId } })
                return {
                    ...comment.dataValues,
                    user: {
                        name: user.name,
                        surname: user.surname,
                        username: user.username,
                        profilePicture: user.profilePicture
                    }
                }
            }))
            return {
                ...event.dataValues,
                locationName: location.description,
                categoryName: category.description,
                user: {
                    name: user.name,
                    surname: user.surname,
                    username: user.username,
                    profilePicture: user.profilePicture
                },
                like: eventLike ? true : false,
                comments: commentsWithUser
            };
        }));
        return res.status(200).json( eventsWithLocationAndCategory )
    } catch (error) {
        console.log('------------------------------------------' + error)
        return res.status(500).json({ message: 'Something went wrong', error })
    }
}

// GET - Get all events and order by number of likes, and replace the location id and category id with the location name and category name, and return the events, for that need verify in the event like table how many likes the event has, and return the number of likes and order by number of likes, get max of 12 events dont return this into another array return all info in the same array
export const getEventsOrderByLikes = async (req, res) => {
    try {
        const events = await EventModel.findAll()
        const eventsWithLocationAndCategory = await Promise.all(events.map(async event => {
            const location = await LocationModel.findOne({ where: { id: event.locationId } });
            const category = await CategoryModel.findOne({ where: { id: event.categoryId } });
            const eventHost = await EventHostModel.findOne({ where: { eventId: event.id } })
            const user = await UserModel.findOne({ where: { id: eventHost.userId } })
            const eventLikes = await EventLikesModel.findAll({ where: { eventId: event.id } })
            return {
                ...event.dataValues,
                locationName: location.description,
                categoryName: category.description,
                user: {
                    name: user.name,
                    surname: user.surname,
                    username: user.username,
                    profilePicture: user.profilePicture
                },
                likes: eventLikes.length
            };
        }));
        const eventsWithLocationAndCategoryAndLikes = eventsWithLocationAndCategory.sort((a, b) => b.likes - a.likes)
        const eventsLikes = eventsWithLocationAndCategoryAndLikes.slice(0, 12)
        return res.status(200).json({ eventsLikes })
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong', error })
    }
}

// POST - Create new comment in the event comment table by user id and event id, in the event comment table save the user id, event id, comment, dont accept empty comments and dont accept comments with more than 180 characters and dont accept comments with special characters and dont accept comments with html tags
export const createEventComment = async (req, res) => {
    try {
        const userId = req.params.id
        const eventId = req.params.eventId
        const { comment } = req.body
        if (comment === '') {
            return res.status(400).json({ message: 'Comment is required' })
        }
        if (comment.length > 180) {
            return res.status(400).json({ message: 'Comment is too long' })
        }
        if (comment.match(/<[^>]*>?/gm)) {
            return res.status(400).json({ message: 'Comment is not valid' })
        }
        const eventComment = await EventCommentsModel.create({ userId, eventId, comment })
        return res.status(200).json({ message: 'Comment created', eventComment })
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong', error })
    }
}

// GET all comments by event id and user id, return all comments from event comment table, and return the name and surname and profilePicture of the user that made the comment, give all this info in the same array
export const getEventComments = async (req, res) => {
    try {
        const eventId = req.params.eventId
        const userId = req.params.id
        const comments = await EventCommentsModel.findAll({ where: { eventId } })
        const commentsWithUser = await Promise.all(comments.map(async comment => {
            const user = await UserModel.findOne({ where: { id: comment.userId } })
            return {
                ...comment.dataValues,
                totalComments: comments.length,
                user: {
                    name: user.name,
                    surname: user.surname,
                    username: user.username,
                    profilePicture: user.profilePicture
                }
            
            }
        }))
        const totalComments = commentsWithUser.length
        commentsWithUser.totalComments = totalComments
        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++' + commentsWithUser )
        return res.status(200).json({ commentsWithUser })
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong', error })
    }
}                                   

//  Image Upload

// Set up storage engine for multer
export const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/events')
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


// delete event by id, delete the event from the event table, delete the event from the event host table, delete the event from the event likes table, delete the event from the event comment table, if event has image delete the image from the uploads/events folder
export const deleteEvent = async (req, res) => {
    try {
        const id = req.params.id
        const event = await EventModel.findOne({ where: { id: id } })
        if (event.image) {
            fs.unlink(`uploads/events/${event.image}`, (err) => {
                if (err) {
                    console.log(err)
                }
            })
        }
        
        await EventHostModel.destroy({ where: { id: id } })
        await EventLikesModel.destroy({ where: { id: id } })
        await EventCommentsModel.destroy({ where: { id: id } })
        await EventModel.destroy({ where: { id: id } })
        return res.status(200).json({ message: 'Event deleted' })
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong', error })
    }
}
