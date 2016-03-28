'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
  

/**
 * Attendance Schema
 */
var AttendanceSchema = new Schema({
    
  name: {
    type: String,
    required: false,
    trim: true
  },
   appointment: {
    type: String,
    required: false,
    trim: true
  },
   note: {
    type: String,
    required: false,
    trim: true
  }
});


mongoose.model('Attendance', AttendanceSchema);