const User = require('../models/userModel');
const secret = process.env.SECRET_KEY
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

module.exports = {

    findAllUsers: (req, res) => {
        User.find()
            .then((allUsers) => {
                res.status(200).json({ users: allUsers })
            })
            .catch((err) => {
                res.status(400).json(err)
            });
    },

    createUser: async (req, res) => {
        try {
            const potentialUserEmail = await User.findOne({ email: req.body.email })
            if (potentialUserEmail) {
                res.status(400).json({ message: 'Email already in use.' })
            } else {
                const newUser = await User.create(req.body)
                const userToken = jwt.sign({ _id: newUser._id, email: newUser.email }, secret, { expiresIn: '2h' })
                res.status(201).cookie('userToken', userToken, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 }).json({ user: newUser })
            }
        }
        catch (err) {
            res.status(400).json(err)
        }
    },

    loginUser: async (req, res) => {
        try{
            const user = await User.findOne({email:req.body.email})
            if(user){
                const passwordsMatch = await bcrypt.compare(req.body.password, user.password)
                if(passwordsMatch){
                    const userToken = jwt.sign({_id: user._id, email:user.email}, secret, {expiresIn:'2h'})
                    res.status(201).cookie('userToken', userToken, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 }).json({ user: user })
                }else{
                    res.status(400).json({message: 'Invalid Email/Password'})
                }
            }else{
                res.status(400).json({message: 'Invalid Email/Password'})
            }
        }
        catch (err) {
            res.status(400).json(err)
        }
    },

    findOneUser: (req, res) => {
        User.findOne({ _id: req.params.id })
            .then(oneUser => {
                res.status(200).json({ user: oneUser })
            })
            .catch((err) => {
                res.status(400).json(err)
            });
    },

    updateUser: (req, res) => {
        User.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        )
            .then(updatedUser => {
                res.status(201).json({ user: updatedUser })
            })
            .catch((err) => {
                res.status(400).json(err)
            });
    },

    deleteUser: (req, res) => {
        User.deleteOne({ _id: req.params.id })
            .then(() => {
                res.status(204).send()
            })
            .catch((err) => {
                res.status(400).json(err)
            });
    }
}