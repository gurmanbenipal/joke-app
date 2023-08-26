const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jokeSchema = new Schema({
    content: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    favoritedBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
    
},{
    timestamps: true
});

module.exports = mongoose.model('Joke', jokeSchema);