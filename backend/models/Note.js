const mongoose = require('mongoose');
const { Schema } = mongoose;
const NotesSchema = new Schema({
     user:{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'user'  //foreign key here
     },  //now we can store user too
    title: {
        type: String,
        required: true,
        
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
       default: Date.now
    }
    
  });

  module.exports = mongoose.model('notes',NotesSchema);