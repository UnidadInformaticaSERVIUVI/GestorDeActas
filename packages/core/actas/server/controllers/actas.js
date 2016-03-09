'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Acta = mongoose.model('Acta'),
    Attendance = mongoose.model('Attendance'),
    config = require('meanio').loadConfig(),
    _ = require('lodash');

 

module.exports = function(Actas) {

    return {
        /**
         * Find acta by id
         */
        acta: function(req, res, next, id) {
            Acta.load(id, function(err, acta) {
                if (err) return next(err);
                if (!acta) return next(new Error('Failed to load acta ' + id));
                req.acta = acta;
                next();
            });
        },
        
        /**
         * Create an acta
         */
        create: function(req, res) {
                //var attendance = new Attendance(req.body.attendance);
                var acta = new Acta(req.body);
                acta.user = req.user;
                var ArrayNewAttendance=[];       
              var ArrayAttendance= req.body.attendance;
              
              for(var i=0; i < ArrayAttendance.length ;i++){
                var attendance = new Attendance(ArrayAttendance[i]);
                attendance.save(function (err) {
                    if(err)
                    console.log('ERROR');
                    else
                    console.log('Saved');
                         
                });
                
                
                ArrayNewAttendance=ArrayNewAttendance.concat(attendance);
              }

                acta.attendance = ArrayNewAttendance;
                
                acta.save(function(err, data) {
            
                    if (err){ 
                    //  return res.status(500).json({
                    //      error: 'Cannot save the acta'
                    //  });   
                        console.log("ERROR Acta::: "+err);}
                    else {
                        
                        Actas.events.publish({
                        action: 'created',
                        user: {
                            name: req.user.name
                        },

                        url: config.hostname + '/actas/' + acta._id,
                        name: acta.title,

                        });    
                        
                        res.json(acta);
                    }
                });
        },
        
        
        
        /**
         * Update an acta
         */
        update: function(req, res) {
            var acta = req.acta;

            acta = _.extend(acta, req.body);


            acta.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot update the acta'
                    });
                }

                Actas.events.publish({
                    action: 'updated',
                    user: {
                        name: req.user.name
                    },
                    url: config.hostname + '/actas/' + acta._id
                });

                res.json(acta);
            });
        },
        /**
         * Delete an acta
         */
        destroy: function(req, res) {
            var acta = req.acta;
            var attendance = req.body.attendance;

            acta.remove(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot delete the acta'
                    });
                }
                
                Actas.events.publish({
                    action: 'deleted',
                    user: {
                        name: req.user.name
                    },
                    name: acta.title,
                });

                res.json(acta);
            });
               attendance.remove(function (err, data) {
if (err) console.log(err);
else console.log('Deleted : ', data );
});
        },
        /**
         * Show an acta
         */
        show: function(req, res) {
           
            Actas.events.publish({
                action: 'viewed',
                user: {
                    name: req.user.name
                },
                name: req.acta.title,
             
                url: config.hostname + '/actas/' + req.acta._id
            });

            res.json(req.acta);
        },
        /**
         * List of Actas
         */
        all: function(req, res) {
            var query = req.acl.query('Acta');

            query.find({}).sort('+created').populate('attendance', 'name appointment note').populate('user', 'name username').exec(function(err, actas) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the actas'
                    });
                }

                res.json(actas)
            });

        },
        
        downloadPDF: function (req,res) {
            console.log("*********Descargar********");
        },
        
        print: function (req,res) {
            console.log("*********IMPRIMIR********");
        }
    };
}

/*
           var total = req.body.attendance.length, 
                result = [];
                

function saveAll() {
                    var attendance = req.body.attendance.pop();
                    attendance.save(function(err,saved) {
                        if (err) throw err;
                        result.push(saved[0]);
                        if(--total) saveAll();
                        else; // all saved here
                        
                    })
                    
                }
                saveAll;*/