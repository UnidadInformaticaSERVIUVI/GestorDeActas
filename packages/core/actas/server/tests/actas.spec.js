/* jshint -W079 */
/* Related to https://github.com/linnovate/mean/issues/898 */
'use strict';

/**
 * Module dependencies.
 */
var expect = require('expect.js'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Attendance = mongoose.model('Attendance'),
  Acta = mongoose.model('Acta');

/**
 * Globals
 */
var user;
var acta;
var attendance;

/**
 * Test Suites
 */
describe('<Unit Test>', function() {
  describe('Model Acta:', function() {
    beforeEach(function(done) {
      this.timeout(10000);
      user = new User({
        name: 'Full name',
        email: 'test@test.com',
        username: 'user',
        password: 'password'
      });
      user.save(function() {
        attendance = new Attendance({
            name: 'Attendance Name',
            appointment: 'Attendance Appointement',
            note: 'Attendance Note',
            acta: acta
        });   
        acta = new Acta({
          title: 'Acta Title',
          place: 'Acta Place',
          content: 'Acta Content',
          user: user,
          attendance: attendance
        });
        done();
      });


    });
    describe('Method Save', function() {

      it('should be able to save without problems', function(done) {
        this.timeout(10000);
        
 return attendance.save(function(err, data) {
          expect(err).to.be(null);
          expect(data.name).to.equal('Attendance Name');
          expect(data.appointment).to.equal('Attendance Appointment');
          expect(data.note).to.equal('Attendance Note');
          expect(data.acta.length).to.not.equal(0);
          expect(data.created.length).to.not.equal(0);
          done();
        });
        return acta.save(function(err, data) {
          expect(err).to.be(null);
          expect(data.title).to.equal('Acta Title');
          expect(data.place).to.equal('Acta Place');
          expect(data.content).to.equal('Acta Content');
          expect(data.user.length).to.not.equal(0);
          expect(data.created.length).to.not.equal(0);
          done();
        });

      });

      it('should be able to show an error when try to save without title', function(done) {
        this.timeout(10000);
        acta.title = '';

        return acta.save(function(err) {
          expect(err).to.not.be(null);
          done();
        });
      });
      
      it('Should be able to show an error when try to save witout Place', function(done) {
          this.timeout(10000);
          acta.place= '';
          
          return acta.save(function(err){
              expect(err).to.not.be(null);
              done();
          });
      });

      it('should be able to show an error when try to save without content', function(done) {
        this.timeout(10000);
        acta.content = '';

        return acta.save(function(err) {
          expect(err).to.not.be(null);
          done();
        });
      });

      it('should be able to show an error when try to save without user', function(done) {
        this.timeout(10000);
        acta.user = null;

        return acta.save(function(err) {
          expect(err).to.not.be(null);
          done();
        });
      });

    });

    afterEach(function(done) {
      this.timeout(10000);
      acta.remove(function() {
        user.remove(done);
        attendance.remove();
      });
    });
  });
});
