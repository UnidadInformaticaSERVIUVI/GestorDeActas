'use strict';

angular.module('mean.actas').controller('ActasController', ['$scope', '$stateParams', '$location', 'Global', 'Actas', 'MeanUser', 'Circles',
  function($scope, $stateParams, $location, Global, Actas, MeanUser, Circles) {
    $scope.global = Global;

    $scope.hasAuthorization = function(acta) {
      if (!acta || !acta.user) return false;
      return MeanUser.isAdmin || acta.user._id === MeanUser.user._id;
    };

    $scope.availableCircles = [];

    Circles.mine(function(acl) {
        $scope.availableCircles = acl.allowed;
        $scope.allDescendants = acl.descendants;
    });

    $scope.showDescendants = function(permission) {
        var temp = $('.ui-select-container .btn-primary').text().split(' ');
        temp.shift(); //remove close icon
        var selected = temp.join(' ');
        $scope.descendants = $scope.allDescendants[selected];
    };

    $scope.selectPermission = function() {
        $scope.descendants = [];
    };

    $scope.create = function(isValid) {
      if (isValid) {

        // $scope.acta.permissions.push('test test');
        var acta = new Actas($scope.acta);

        acta.$save(function(response) {
          $location.path('actas/' + response._id);
        });

        $scope.acta = {};

      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(acta) {
      if (acta) {
        acta.$remove(function(response) {
          for (var i in $scope.actas) {
            if ($scope.actas[i] === acta) {
              $scope.actas.splice(i, 1);
            }
          }
          $location.path('actas');
        });
      } else {
        $scope.acta.$remove(function(response) {
          $location.path('actas');
        });
      }
    };
    
    $scope.update = function(isValid) {
      if (isValid) {
        var acta = $scope.acta;
        if (!acta.updated) {
          acta.updated = [];
        }
        acta.updated.push(new Date().getTime());

        acta.$update(function() {
          $location.path('actas/' + acta._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Actas.query(function(actas) {
        $scope.actas = actas;
      });
    };

    $scope.findOne = function() {
      Actas.get({
        actaId: $stateParams.actaId
      }, function(acta) {
        $scope.acta = acta;
      });
    };
  }
]);