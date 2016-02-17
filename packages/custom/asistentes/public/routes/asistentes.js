(function () {
  'use strict';

  angular
    .module('mean.asistentes')
    .config(asistentes);

  asistentes.$inject = ['$stateProvider'];

  function asistentes($stateProvider) {
    $stateProvider.state('asistentes example page', {
      url: '/asistentes/example',
      templateUrl: 'asistentes/views/index.html'
    });
  }

})();
