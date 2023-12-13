const router = require('express').Router()
const userController = require('../controllers/user-controller')
const {body} = require('express-validator')

router.post('/sign_up',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.registration
);
router.post('/login', userController.login)
router.post('/refresh', userController.refresh)
router.get('/users', userController.getUsers)

module.exports = router
