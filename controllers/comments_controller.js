 const Comment = require('../models/comment');
 const Post = require('../models/post');

 //to create comment on the post , first we need to identify in which post user has commented
 // and we pass post id from the form and than check whether post with the incoming post id exist or not
 module.exports.create = function(req,res){
        Post.findById(req.body.post, function(err, post){
            if(post){
                Comment.create({
                    content: req.body.content,
                    post: req.body.post,
                    user: req.user._id
                }, function(err, comment){


                    // console.log('is this a comment id or a comment object',comment);
                    // post.comments.push(comment._id); // both are working why dont know
                    post.comments.push(comment);
                    post.save();

                    res.redirect('/');
                });
            }
        });
 }