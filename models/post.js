const mongoose = require('mongoose');
const enumValues = require('mongoose-enumvalues');


const Schema = mongoose.Schema;


const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 4,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userName: String,
  userAvatar: String,
}, {
  timestamps: true
});


const postSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    enum:
      ['V0', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8',
      'V9', 'V10', 'V11', 'V12', 'V13', 'V14', 'V15', 'V16',
      'V17', 'V18'],
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  img: {
    data: Buffer,
    type: String,
  },
  userName: String,
  userAvatar: String,
  comments: [commentSchema],
}, {
  timestamps: true
});


module.exports = mongoose.model('Post', postSchema);
