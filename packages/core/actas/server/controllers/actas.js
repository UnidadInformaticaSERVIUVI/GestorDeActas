'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Acta = mongoose.model('Acta'),
    Attendance = mongoose.model('Attendance'),
    Commitment = mongoose.model('Commitment'),
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
         commitment: function(req, res, next, id) {
            Commitment.load(id, function(err, commitment) {
                if (err) return next(err);
                if (!commitment) return next(new Error('Failed to load commitment ' + id));
                req.commitment = commitment;
                next();
            });
        },
        
       
        
        /**
         * Create an acta
         */
        create: function(req, res) {
                //var attendance = new Attendance(req.body.attendance);
                console.log(req.body);
                var acta = new Acta(req.body);
                acta.user = req.user;
                var ArrayNewAttendance=[];       
              var ArrayAttendance= req.body.attendance;
              
              var ArrayCommitment=req.body.commitment;
              var ArrayNewCommitment=[];
              
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
              //Aqui se empieza a crear commitment, el que se guardan todos los commitments en un array
              
              for( i=0; i < ArrayCommitment.length ; i++){
         
         var commitment = new Commitment(ArrayCommitment[i]);
         
                  ArrayNewCommitment=ArrayNewCommitment.concat(commitment);
                   };
                   
                   for (var h=0; h < ArrayNewCommitment.length; h++){
                      
                      for (var i=0; i < ArrayNewAttendance.length; i++){
                      
                      if (ArrayNewAttendance[i].name !== ArrayNewCommitment[h].committed ) {
                        
                      }else{
                      
                      //se le entrega el id del objeto attendance a el objeto commitment.attendnace_id
                      commitment.attendance=ArrayNewAttendance[i]._id;
                                            
                      //A continuación se guarda commitment
                      commitment.save(function (err) {
                    if(err)
                    console.log('ERROR');
                    else
                    console.log('Saved commitment');
                         
                });
                          
                  }};
                                                
                  };
                   
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
        
       allcommitment: function(req, res){
            
    var Commitment = mongoose.model('Commitment', Commitment);
 
      //var query = req.acl.query('commitments');
          
          Commitment.find({}).sort('-created').populate('name').exec(function(err, commitments) {
              console.log(commitments);
          
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the commitments'
                    });
                }

                res.json(commitments)
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

/*module.exports = function(Commitments) {
    return {
        
         commitments: function(req, res, next, id) {
            Commitment.load(id, function(err, commitment) {
                if (err) return next(err);
                if (!commitment) return next(new Error('Failed to load commitment ' + id));
                req.commitment = commitment;
                next();
            });
        },
         allcommitment: function(req, res){
          var query = req.acl.query('Commitment');
          
          query.find({}).sort('+created').populate('attendance', 'name ').exec(function(err, commitments) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the commitments'
                    });
                }

                res.json(commitments)
            });
        },
         
         * Show an commitment
         
        show: function(req, res) {
           
            Commitments.events.publish({
                action: 'viewed',
                user: {
                    name: req.commitment.attendance
                },
                deadline: req.commitment.deadline,
             
                url: config.hostname + '/commitments/' + req.commitment._id
            });

            res.json(req.commitment);
        },
        
    };
}*/