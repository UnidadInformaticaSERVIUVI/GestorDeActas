'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Acta = mongoose.model('Acta'),
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
            var acta = new Acta(req.body);
            acta.user = req.user;

            acta.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save the acta'
                    });
                }

                Actas.events.publish({
                    action: 'created',
                    user: {
                        name: req.user.name
                    },
                    url: config.hostname + '/actas/' + acta._id,
                    name: acta.title
                });

                res.json(acta);
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
                    name: acta.title,
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
                    name: acta.title
                });

                res.json(acta);
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

            query.find({}).sort('-created').populate('user', 'name username').exec(function(err, actas) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the actas'
                    });
                }

                res.json(actas)
            });

        }
    };
}