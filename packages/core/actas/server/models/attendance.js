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
    required: true,
    trim: true
  },
   appointment: {
    type: String,
    required: true,
    trim: true
  },
   note: {
    type: String,
    required: true,
    trim: true
  }
});


mongoose.model('Attendance', AttendanceSchema);