var
	mongoose = require('mongoose'),
	Schema = mongoose.Schema

var postSchema = new Schema({
	memory: String,
	date: String,
	avatar_url : String,
	userid: String,
	albumid: String,
	userbio: String,
	username: String,
	isPrivate: Boolean

})

var Post = mongoose.model('Post', postSchema)

module.exports = Post
//