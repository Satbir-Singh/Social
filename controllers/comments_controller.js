 const Comment = require('../models/comment');
 const Post = require('../models/post');

 //to create comment on the post , first we need to identify in which post user has commented
 // and we pass post id from the form and than check whether post with the incoming post id exist or not
 module.exports.create = async function(req,res){

    try {

        let post = await Post.findById(req.body.post);
        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

                // console.log('is this a comment id or a comment object',comment);
                // post.comments.push(comment._id); // both are working why dont know
                post.comments.push(comment);
                post.save();

                res.redirect('/');
            
        }
        
    } catch (err) {

        console.log('Error', err);
        return;
        
    }

       
       
 }


 //deleting comment on the post
 module.exports.destroy = async function(req, res){

    try {

        let comment = await Comment.findById(req.params.id);
        if(comment.user == req.user.id){

           let postId = comment.post;

           comment.remove();

           let post = await Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});

           return res.redirect('back');
           
       }else{

           return res.redirect('back');
        }  
        
    } catch (err) {

        console.log('Error',err);
        
    }

     
}
 