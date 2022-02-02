const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


passport.use(new googleStrategy({
    clientID: "33832831248-47ou48fpua210gaem86c026iooua6l1o.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
},

function(accessToken, refreshToken, profile, done){

    User.findOne({email: profile.emails[0].value}).exec(function(err,user){

        if(err) {console.log('error in google strategy', err); return;}

        console.log(profile);

        if(user){
            //if found, set this user as req.user
            return done(null, user);
        }else{
            //if not found, create the user and set it as req.user
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            }, function(err, user){

                if(err) {console.log('error in google strategy', err); return;}

                return done(null, user);

            })
        }
    })

}

))
