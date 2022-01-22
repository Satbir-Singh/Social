module.exports.profile = function(req,res){
   // res.end('<h1>User Profile</h1>');
   return res.render('home',{
       title: "User Profile"
   });
}

module.exports.post = function(req,res){
    res.end('<h1>User Post</h1>');
}
