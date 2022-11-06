let express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// Middlewares
const authMiddleware = require('../middlewares/authMiddleware')
const guestMiddleware = require('../middlewares/guestMiddleware')
const multerUserMiddleware = require('../middlewares/multerUserMiddleware');
const registerValidationMiddleware = require('../middlewares/registerValidationMiddleware');


router.get('/shopping-cart', userController.cart);

router.get('/login', guestMiddleware, userController.login);
router.post('/login', userController.loginProcess);

router.get('/profile/:id', authMiddleware, userController.profile);

router.get('/register', guestMiddleware, userController.register);
router.post('/register', multerUserMiddleware.single('imageUser'), registerValidationMiddleware, userController.store);

router.get('/logout/', userController.logout)

module.exports = router;