const { Schema, model } = require('mongoose'); 

const UserSchema = new Schema({
    userName: {
        type: String, 
        unique: true, 
        required: true, 
        trim: true, 
      },
      email: {
        type: String, 
        required: true, 
        unique: true, 
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Must enter a valid email"
        ],
      },
      thoughts: [
        {
          type: Schema.Types.ObjectId, 
          ref: "Thought", 
        }
      ], 
      friends: [
        {
          type: Schema.Types.ObjectId, 
          ref: "User", 
        }, 
      ]
    }, 
    {
      toJSON: {
        virtuals: true, 
      }, 
      id: false
    }
); 

UserSchema.virtual('thoughtCount').get(function() {
  return this.thoughts.length; 
})

const User = model('User', UserSchema); 

module.exports = User; 