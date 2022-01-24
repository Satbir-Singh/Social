const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');

router.get('/profile', usersController.profile);

 
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);



router.get('/sign-out', usersController.signOut);


router.post('/create', usersController.create);
router.post('/create-session', usersController.createSession);







 

// router.get('/post', usersController.post);

// router.get('/signinDetails',usersController.signinDetails);
// router.get('/signupDetails',usersController.signupDetails);


module.exports = router;
