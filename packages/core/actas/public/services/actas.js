'use strict';

//Actas service used for actas REST endpoint
angular.module('mean.actas').factory('Actas', ['$resource',
  function($resource) {
           alert("DONWLOAD 2");
    return $resource('api/actas/:actaId', { actaId: '@_id'}, { update: { method: 'PUT'} }, {download: {method: 'DOWNLOAD'}} );
  }
]);
