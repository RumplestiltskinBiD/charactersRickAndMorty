const Router = require('express')
const User = require('../models/User')
const config = require('config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const router = new Router()
const authMiddleware = require('../middleware/auth.middleware')

let userEmail
let userPassword

router.post('/registration',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Password must be longer then 3 and shorter then 30').isLength({min: 3, max: 30})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({message: 'Incorrect request', errors})
        }
        const {email, password} = req.body
        userEmail = email
        userPassword = password
        const isUserExist = await User.findOne({email})
        if (isUserExist) {
            return res.status(400).json({message: `User with email ${email} already exist`})
        }
        const hashPassword = await bcrypt.hash(password, 8)
        const user = new User({email, password: hashPassword})
        await user.save()
        return res.json({message: `User ${email} was created`})

    } catch (e) {
        console.log(e)
        res.send({message: 'Server error'})
    }
})

router.post('/login',
    async (req, res) => {
        try {
            const {email, password} = req.body
            userEmail = email
            userPassword = password
            const user = await User.findOne({email})
            if (!user) {
                return res.status(404).json({message: 'User is not found'})
            }
            const isPassValid = bcrypt.compareSync(password, user.password)
            if(!isPassValid) {
                return res.status(400).json({message: 'Invalid password'})
            }
            const token = jwt.sign({id: user.id}, config.get('secretKey'), {expiresIn: '1h'})
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email
                }
            })

        } catch (e) {
            console.log(e)
        }
    })

router.get('/auth', authMiddleware,
    async (req, res) => {
        try {
            const user = User.findOne({_id: req.user.id})
            const token = jwt.sign({id: user.id}, config.get('secretKey'), {expiresIn: '1h'})
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email
                }
            })
        } catch (e) {
            console.log(e)
        }
    })

router.get('/userpage', authMiddleware,
    async (req, res) => {
        try {
            const user = User.findOne({_id: req.user.id})
            let data = {userEmail, userPassword}
            return res.json(data)
        } catch (e) {
            console.log(e)
        }
    })

module.exports = router
