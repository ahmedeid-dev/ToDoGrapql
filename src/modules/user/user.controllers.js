import User from './../../../database/model/user.model.js';
import asyncHandler from "express-async-handler"
import jwt from 'jsonwebtoken'

export const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body
    !email && !password && res.status(400).json({ message: 'All fields are required' })

    const user = await User.findOne({ email })
    !user || user.password !== password && res.status(400).json({ message: 'Invalid credentials' })

    user.status = 'inactive' && res.status(401).json('you are not active , please contact admin')
    const token = jwt.sign({
        userId: user._id,
        email,
        status: user.status
    }, 'mysecretkey', { expiresIn: '1d' })
    res.status(200).json({ message: 'Login successfully', token })
})


export const signup = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body
    !name && !email && !password && res.status(400).json({ message: 'All fields are required' })

    const emailExist = await User.findOne({ email })
    emailExist && res.status(400).json({ message: 'Email already exist' })

    const user = new User({ name, email, password, status: 'active' })
    await user.save()
    const token = jwt.sign({
        userId: user._id,
        email,
        status: user.status
    }, 'mysecretkey', { expiresIn: '1d' })

    res.status(201).json({ message: 'Signup successfully', token })
})

export const changePassword = asyncHandler(async (req, res, next) => {
    const { email, status } = req.user
    const { oldPassword, newPassword } = req.body
    !email && !oldPassword && !newPassword && res.status(400).json({ message: 'All fields are required' })

    const user = await User.findOne({ email })
    !user || user.password !== oldPassword && res.status(400).json({ message: 'Invalid credentials' })
    status == 'inactive' && res.status(401).json('you are not active , please contact admin')

    user.password = newPassword
    await user.save()

    const token = jwt.sign({
        userId: user._id,
        email,
        status: user.status
    }, 'mysecretkey', { expiresIn: '1d' })

    res.status(200).json({ message: 'Password updated successfully', token })
})


export const update = asyncHandler(async (req, res, next) => {

    const { email, status } = req.user
    const { name, newEmail } = req.body
    !name && !newEmail && res.status(400).json({ message: 'All fields are required' })

    const user = await User.findOne({ email })
    !user && res.status(400).json({ message: 'User not found' })
    status == 'inactive' && res.status(401).json('you are not active , please contact admin')

    name && (user.name = name)
    email && (user.email = newEmail)
    await user.save()

    const token = jwt.sign({
        userId: user._id,
        email: newEmail,
        status: user.status
    }, 'mysecretkey', { expiresIn: '1d' })

    res.status(200).json({ message: 'User updated successfully', token })
})


export const deleteAccount = asyncHandler(async (req, res, next) => {
    const { email, status } = req.user

    const user = await User.findOne({ email })
    !user && res.status(400).json({ message: 'Invalid credentials' })

    status == 'inactive' && res.status(401).json('you are not active , please contact admin')

    user.status = 'inactive'
    await user.save()

    res.status(200).json({ message: 'User deleted successfully' })
}
)
