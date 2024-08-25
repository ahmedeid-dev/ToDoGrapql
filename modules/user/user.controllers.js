import User from './../../database/model/user.model.js';

export const login = async (req, res, next) => {
    const { email, password } = req.body
    !email && !password && res.status(400).json({ message: 'All fields are required' })

    const user = await User.findOne({ email })
    !user || user.password !== password && res.status(400).json({ message: 'Invalid credentials' })

    user.status = 'inactive' && res.status(401).json('you are not active , please contact admin')

    res.status(200).json({ message: 'Login successfully' })
}


export const signup = async (req, res, next) => {
    const { name, email, password } = req.body
    !name && !email && !password && res.status(400).json({ message: 'All fields are required' })

    const emailExist = await User.findOne({ email })
    emailExist && res.status(400).json({ message: 'Email already exist' })

    const user = new User({ name, email, password, status: 'active' })
    await user.save()
    res.status(201).json({ message: 'Signup successfully' })
}

export const changePassword = async (req, res, next) => {

    const { email, oldPassword, newPassword } = req.body
    !email && !oldPassword && !newPassword && res.status(400).json({ message: 'All fields are required' })

    const user = await User.findOne({ email })
    !user || user.password !== oldPassword && res.status(400).json({ message: 'Invalid credentials' })
    user.status = 'inactive' && res.status(401).json('you are not active , please contact admin')

    user.password = newPassword
    await user.save()
    
    res.status(200).json({ message: 'Password updated successfully' })
}


export const update = async (req, res, next) => {
    const { name, email } = req.body
    !name && !email && res.status(400).json({ message: 'All fields are required' })

    const user = await User.findOne({ email })
    !user && res.status(400).json({ message: 'User not found' })
    user.status = 'inactive' && res.status(401).json('you are not active , please contact admin')

    name && (user.name = name)
    email && (user.email = email)
    await user.save()
    res.status(200).json({ message: 'User updated successfully' })
}


export const deleteAccount = async (req, res, next) => {
    const { email, password } = req.body
    !email && !password && res.status(400).json({ message: 'All fields are required' })

    const user = await User.findOne({ email })
    !user || user.password !== password && res.status(400).json({ message: 'Invalid credentials' })

    user.status = 'inactive' && res.status(401).json('you are not active , please contact admin')

    user.status = 'inactive'
    res.status(200).json({ message: 'User deleted successfully' })
}

