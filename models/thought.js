const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction');

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timeformatted,
  },
  username: {
    type: String,
    required: true,
  },
  reactions: 
    [reactionSchema],
},
{
  toJSON: {
    virtuals: true,
  },
  id: false,
}
);

function timeformatted(createdAt) {
  return createdAt.toLocaleString();
}

// Create a virtual property `reactionCount` that gets the amount of reactions per post
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;