// Load User model
const List = require("../models/List");
const User = require("../models/User");

//Creating a list item
createList = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a List',
        })
    }

    const list = new List(body)

    if (!list) {
        return res.status(400).json({ success: false, error: err })
    }

    list
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: list._id,
                message: 'List created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'List not created!',
            })
        })
}

updateList = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    List.findOne({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'List not found!',
            })
        }
        list.userId = body.userId
        list.task = body.task
        list.completed = body.completed
        list.date = body.date
        list
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: list._id,
                    message: 'List updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'List not updated!',
                })
            })
    })
}

deleteList = async (req, res) => {
    await List.findOneAndDelete({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!list) {
            return res
                .status(404)
                .json({ success: false, error: `List not found` })
        }

        return res.status(200).json({ success: true, data: list })
    }).catch(err => console.log(err))
}

getListById = async (req, res) => {
    await List.findOne({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!list) {
            return res
                .status(404)
                .json({ success: false, error: `List not found` })
        }
        return res.status(200).json({ success: true, data: list })
    }).catch(err => console.log(err))
}

getListByUserId = async (req, res) => {
    await List.find({userid: req.params.id}, (err, Lists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!Lists.length) {
            return res
                .status(404)
                .json({ success: false, error: `List not found` })
        }
        return res.status(200).json({ success: true, data: Lists })
    }).catch(err => console.log(err))
}

getLists = async (req, res) => {
    await List.find({}, (err, Lists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!Lists.length) {
            return res
                .status(404)
                .json({ success: false, error: `List not found` })
        }
        return res.status(200).json({ success: true, data: Lists })
    }).catch(err => console.log(err))
}

module.exports = {
    createList,
    updateList,
    deleteList,
    getLists,
    getListById,
    getListByUserId,
}