(function () {
  'use strict';

  angular
    .module('mean.asistentes')
    .factory('Asistentes', Asistentes);

  Asistentes.$inject = [];

  function Asistentes() {
    return {
      name: 'asistentes'
    };
  }
})();
