var
	mongoose = require('mongoose'),
	Schema = mongoose.Schema

var postSchema = new Schema({
	model: String,
	make: String,
	year: Number,
	userid: String
})

var Post = mongoose.model('Post', postSchema)

module.exports = Post