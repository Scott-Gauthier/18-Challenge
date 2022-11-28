// const { ObjectId } = require('mongodb');
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  },
  thoughts: [{
    type: Schema.Types.ObjectId,
    ref: 'thought',
  }],
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
  }],
  
},
{
  toJSON: {
    virtuals: true,
  },
  id: false,
}
);

// Create a virtual property `friendCount` that gets the amount of friends per post
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;