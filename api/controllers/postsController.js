var Post = require('../models/Post.js');

function getAllPosts(req,res){
	Post.find({}, function(err, posts){
		res.json(posts)	
	})
}

function createPost(req,res){
	var newPost = new Post
	newPost.make = req.body.make
	newPost.model = req.body.model
	newPost.year = req.body.year
	newPost.userid = req.body.userid
	
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