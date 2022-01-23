module.exports.home = function(req,res){
    
    //return res.end('<h1>Express is up for codeial</h1>');

    return res.render('home', {
        title: "Home"
    });


}


module.exports.signIn = function(req,res){

    return res.render('sign_in',{
        title: "Sign In Page"
        
    });
}

module.exports.signUp = function(req,res){
    return res.render('sign_up',{
        title: "Sign Up Page"
      
    });
}

