const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

mongoose.connect(url)
	.then(result => console.log('connected to MongoDB'))
	.catch(error => console.log('error connecting to MongoDB: ', error.message));

const noteSchema = new mongoose.Schema({
	content: String,
	important: Boolean,
});

noteSchema.set('toJSON', {
	transform: (doc, ret) => {
		ret.id = ret._id.toString();
		delete ret._id;
		delete ret.__v;
	}
});

module.exports = mongoose.model('Note', noteSchema);
