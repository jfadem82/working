var Post = require('../models/Post.js');

function getAllPosts(req,res){
	Post.find({}, function(err, posts){
		res.json(posts)	
	})
}

function createPost(req,res){
	var newPost = new Post
	newPost.description = req.body.description
	newPost.date = req.body.date
	newPost.avatar_url = req.body.avatar_url
	newPost.userid = req.decoded.userid

	newPost.save(function(err, post){
		if(err) throw err
		res.json({message: "Post Saved!", post: post})
	})
}

function getOnePost(req,res){
	Post.findById(req.params.id, function(err,post){
		if(err) throw err
		res.json(post)
	})
}

function updatePost(req,res){
	Post.findOneAndUpdate({_id: req.params.id}, req.body, function(err,post){
		if(err) throw err
		Post.findById(req.params.id, function(err,updatedPost){
			res.json(updatedPost)
		})
	})
}

function deletePost(req,res){
	Post.findOneAndRemove({_id: req.params.id}, req.body, function(err,post){
		if(err) throw err
		res.json({message:"post deleted!"})
	})
}


module.exports = {
	getAllPosts : getAllPosts,
	createPost : createPost,
	getOnePost : getOnePost,
	updatePost : updatePost,
	deletePost : deletePost

}