'use strict';

exports.load = function(swagger, parms) {

  var searchParms = parms.searchableOptions;

  var list = {
    'spec': {
      description: 'Acta operations',
      path: '/actas',
      method: 'GET',
      summary: 'Get all Actas',
      notes: '',
      type: 'Acta',
      nickname: 'getActas',
      produces: ['application/json'],
      params: searchParms
    }
  };
  
  var see={
    'spec': {
      description: 'Commitment operations',
      path: '/compromisos',
      method: 'GET',
      summary: 'Get all Commitments',
      notes: '',
      type: 'Commitment',
      nickname: 'getCommitments',
      produces: ['application/json'],
      params: searchParms
    }
  };

  var create = {
    'spec': {
      description: 'Device operations',
      path: '/actas',
      method: 'POST',
      summary: 'Create acta',
      notes: '',
      type: 'Acta',
      nickname: 'createActa',
      produces: ['application/json'],
      parameters: [{
        name: 'body',
        description: 'Acta to create.  User will be inferred by the authenticated user.',
        required: true,
        type: 'Acta',
        paramType: 'body',
        allowMultiple: false
      }]
    }
  };

  swagger.addGet(list)
  swagger.addGet(see)
    .addPost(create);

};
