'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
  

/**
 * Attendances Schema
 */
var AttendanceSchema = new Schema({
  acta: {
    type: Schema.ObjectId,
    ref: 'Acta',
    required: true
  },
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

AttendanceSchema.path('name').validate(function(name) {
  return !!name;
}, 'Name cannot be blank');

AttendanceSchema.path('appointment').validate(function(appointment) {
  return !!appointment;
}, 'Appointment cannot be blank');

AttendanceSchema.path('note').validate(function(note) {
  return !!note;
}, 'Note cannot be blank');

mongoose.model('Attendance', AttendanceSchema);