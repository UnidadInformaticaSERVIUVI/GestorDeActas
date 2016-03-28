'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Acta Schema
 */
var ActaSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
   place: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  attendance: [
      {
    type: Schema.Types.ObjectId,
    ref: 'Attendance',
    required: true}],   
  permissions: {
    type: Array
  },
  updated: {
    type: Array
  }
});

/**
 * Validations
 */
ActaSchema.path('title').validate(function(title) {
  return !!title;
}, 'Title cannot be blank');

ActaSchema.path('place').validate(function(place) {
  return !!place;
}, 'Place cannot be blank');

ActaSchema.path('content').validate(function(content) {
  return !!content;
}, 'Content cannot be blank');

/**
 * Statics
 */
ActaSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').populate('attendance', 'name appointment note').exec(cb);
};

mongoose.model('Acta', ActaSchema);
