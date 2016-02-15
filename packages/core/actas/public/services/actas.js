'use strict';

//Actas service used for actas REST endpoint
angular.module('mean.actas').factory('Actas', ['$resource',
  function($resource) {
    return $resource('api/actas/:actaId', {
      actaId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
