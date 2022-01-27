const Post = require('../models/post');
const Comment = require('../models/comment')

module.exports.create = function(req,res){

    Post.create({
        content: req.body.content,
        user: req.user._id
    
    }, function(err, user){
        if(err){console.log('error in posting message'); return;}

       
    });


    return res.redirect('back');
}


module.exports.destroy = function(req, res){

    Post.findById(req.params.id, function(err, post){


            // .id means converting the object id into the string
            if(post.user == req.user.id) {

                post.remove();

                //functin only take one arguments becz delete will not return anything
                Comment.deleteMany({post: req.params.id}, function(err){
                    return res.redirect('back');
                });


            }else{

                return res.redirect('back');
            }

    });
}
