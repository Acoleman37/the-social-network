const { Schema, model } = require('mongoose');

const UserSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: trim,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: [/^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/, "Must be a valid email address"]
        },
        thoughts: [
            {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// create the User Model using the Schema
const User = model('User', UserSchema);

// Get total count of comments and replies on retrieval
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

// Export the User model
module.exports = User;