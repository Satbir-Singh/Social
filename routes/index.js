const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('router loaded');

router.get('/', homeController.home);

// router.get('/signin',homeController.signIn);
// router.get('/signup',homeController.signUp);



router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments', require('./comments'));

module.exports = router;