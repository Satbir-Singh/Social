const User = require("../models/user");

module.exports.profile = function(req,res){
   // res.end('<h1>User Profile</h1>');
   if(req.cookies.user_id)
   {
       User.findById(req.cookies.user_id, function(err, user){
           if(user){
               return res.render('user_profile', {
                   title: "User Profile",
                   user: user
               })
           }

           return res.redirect('/users/sign-in');
       });
   }else{
    return res.redirect('/users/sign-in');
   }

   
//    return res.render('user_profile',{
//        title: "User Profile"
//    });
}

module.exports.post = function(req,res){
    res.end('<h1>User Post</h1>');
}

//render the sign up page
module.exports.signUp = function(req,res){
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    });
}

//render the sign in page

module.exports.signIn = function(req,res){
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    });
}

//get the sign up data
module.exports.create = function(req,res){
    //TODO Later

    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err,user){
        if(err){console.log('error in finding user in signing up'); return}

        if(!user){
            User.create(req.body, function(err,user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/sign-in');
            });
        }else{

            return res.redirect('back');

        }
    });
}

//sign in and create a session for the user
module.exports.createSession = function(req,res){

    //steps to authenticate
    //find the user

    User.findOne({email: req.body.email}, function(err,user){
        if(err){console.log('Error in finding user in signing in'); return};
        //handle user found

        if(user){
            
            //handle password that dosn't match
            if(user.password != req.body.password)
            {
                return res.redirect('back');
            }
            
            //handle session creation
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        }else{

            // handle user not found
            return res.redirect('back');
        }
    })

}



//to get signout from the profile page
module.exports.signOut = function(req,res){


    
    res.cookie('user_id',null);
   
    return res.redirect('/users/sign-in');

}


// module.exports.signinDetails = function(req,res){




//         return res.render('successful',{
//             title: "Sign In Page",
//             work: "In"
//         });
//     }
    
// module.exports.signupDetails = function(req,res){
//         return res.render('successful',{
//             title: "Sign Up Page",
//             work: "Up"
//         });
//     }
