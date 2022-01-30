const Post = require('../models/post');
const Comment = require('../models/comment')


// function to create a post 
module.exports.create = async function(req,res){

    try {

       let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        
        });

        if(req.xhr){
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post Created!"
            });
        }

        req.flash('success', 'Post Published!');
        return res.redirect('back');
        
    } catch (err) {

        req.flash('error', err);
        // console.log('error in posting message'); 
        return res.redirect('back');
    }

   
}



module.exports.destroy = async function(req, res){



        try {
                let post = await Post.findById(req.params.id);
                // .id means converting the object id into the string
                if(post.user == req.user.id) {

                    post.remove();

                    //functin only take one arguments becz delete will not return anything
                    await Comment.deleteMany({post: req.params.id});

                    if(req.xhr){
                        return res.status(200).json({
                            data: {
                                post_id: req.params.id
                            },
                            message: "Post deleted!"
                        });
                    }

                    req.flash('success', 'Post and associated comments deleted!');
                    return res.redirect('back');

                }else{

                    req.flash('error','You cannot delete this post!');
                    return res.redirect('back');
                }
            
        } catch (err) {

            req.flash('error', err);
            // console.log('Error', err); 
            return res.redirect('back');
            
        }   

 }
    
    
    
    
    
    
    
    // Post.findById(req.params.id, function(err, post){


    //         // .id means converting the object id into the string
    //         if(post.user == req.user.id) {

    //             post.remove();

    //             //functin only take one arguments becz delete will not return anything
    //             Comment.deleteMany({post: req.params.id}, function(err){
    //                 return res.redirect('back');
    //             });


    //         }else{

    //             return res.redirect('back');
    //         }

    // });


