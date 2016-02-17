(function () {
  'use strict';

  /* jshint -W098 */
  angular.module('mean.asistentes').controller('AsistentesController', AsistentesController);

  AsistentesController.$inject = ['$scope', 'Global', 'Asistentes'];

  function AsistentesController($scope, Global, Asistentes) {
    $scope.global = Global;
    $scope.package = {
      name: 'asistentes'
    };
     $scope.invoice = {
        items: [{
            name: '',
            appointment: '',
            note: ''}]
    };

    $scope.addItem = function() {
        $scope.invoice.items.push({
            name: '',
            appointment: '',
            note: ''
        });
    },

    $scope.removeItem = function(index) {
        $scope.invoice.items.splice(index, 1);
    },

    $scope.total = function() {
        var total = 0;
        angular.forEach($scope.invoice.items, function(item) {
            total +=  angular.isNumber(item.name);
        })

        return total;
    }
    
  }
})();