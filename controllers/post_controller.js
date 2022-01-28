const Post = require('../models/post');
const Comment = require('../models/comment')


// function to create async await
module.exports.create = async function(req,res){

    try {

       await Post.create({
            content: req.body.content,
            user: req.user._id
        
        });

        return res.redirect('back');
        
    } catch (err) {
        
        console.log('error in posting message'); 
        return;
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
                    return res.redirect('back');

                }else{

                    return res.redirect('back');
                }
            
        } catch (err) {

            console.log('Error', err); 
            return;
            
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


