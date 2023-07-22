const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  _id:{
    // type:Number,
    // required: [true, 'Name is productName']
  },
  productName:{
      type:String,
      // required: [true, 'Name is productName']
    },
    from:{
      type:String,
      // required: [true, 'Name is from']
    },
    nutrients:{
      type:String,
      // required: [true, 'Name is nutrients']
    },
    quantity:{
      type:Number,
    },
    rating:{
      type:Number,
      // default:4.5
    },
  
    description:{
      type:String,
      // required: [true, 'Name is description']
    },
    organic:{
      type:String,
      // re,quired: [true, 'Name is description']
    },
    price:{
      type:String,
      // required: [true, 'Name is description']
    }
  });
  
  
  const Tour = mongoose.model('foodStore', tourSchema);

  module.exports = Tour;