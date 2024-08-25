import Note from './../../../database/model/note.model.js';
import asyncHandler from "express-async-handler"

export const create = asyncHandler(async (req, res, next) => {
    const { userId, status } = req.user
    !userId || !status || status === 'inactive' && res.status(400).json({ message: 'you are not authorized' })
    
    const { title, description } = req.body
    !title && !description && res.status(400).json({ message: 'All fields are required' })

    const note = new Note({ title, description , user: userId })
    await note.save()

    res.status(201).json({ message: 'Note created successfully', note })
})

export const update = asyncHandler(async (req, res, next) => {
    const { userId, status } = req.user
    !userId || !status || status === 'inactive' && res.status(400).json({ message: 'you are not authorized' })
    
    const { title, description } = req.body
    !title && !description && res.status(400).json({ message: 'All fields are required' })

    const note = await Note.findOne({ _id: req.params.id , user: userId })
    !note && res.status(400).json({ message: 'Note not found' })

    title && (note.title = title)
    description && (note.description = description)

    await note.save()

    res.status(200).json({ message: 'Note updated successfully', note })
})

export const deleteNote = asyncHandler(async (req, res, next) => {
    const { userId, status } = req.user
    !userId || !status || status === 'inactive' && res.status(400).json({ message: 'you are not authorized' })
    
    const note = await Note.findOne({ _id: req.params.id })
    !note && res.status(400).json({ message: 'Note not found' })

    await Note.deleteOne({ _id: req.params.id , user: userId })

    res.status(200).json({ message: 'Note deleted successfully' })
})

export const getAll = asyncHandler(async (req, res, next) => {
    const {userId, status } = req.user
    !userId || !status || status === 'inactive' && res.status(400).json({ message: 'you are not authorized' })
    
    const notes = await Note.find({ user: userId })

    res.status(200).json({ 'message': 'All notes', notes })
})