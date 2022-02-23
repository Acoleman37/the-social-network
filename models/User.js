const { Schema, model } = require('mongoose');
const moment = require('moment');

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
            validate: {
                validator:
                function(value) {
                    return value === 'correct@example.com';
                },
                message: 'Invalid email!',
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
            ],
        }
    }
)

// Get a total number of friends

UserSchema.virtual('friendCount').get(function() {
    return this.friends.reduce((total, friend) => total + friend.count.length + 1,0);
});