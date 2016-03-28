'use strict';
/* Commitment angular */

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
  

/**
 * Commitment Schema
 */
var CommitmentSchema = new Schema({
   
  attendance_id: {
    type: Schema.ObjectId,
    ref: 'Attendance',
    required: false
  }, 
    deadline: {
    type: Date,
    required: false,
  },
   attendance: {
    type: String,
    required: false,
    trim: true
  },
   description: {
    type: String,
    required: false,
    trim: true
  }
});

CommitmentSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).exec(cb);
};

mongoose.model('Commitment', CommitmentSchema);