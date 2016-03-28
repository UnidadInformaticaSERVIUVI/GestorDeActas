'use strict';

angular.module('mean.actas').controller('ActasController', ['$scope', '$stateParams', '$location', 'Global', 'Actas', 'MeanUser', 'Circles','Commitments',
  function($scope, $stateParams, $location, Global, Actas, MeanUser, Circles, Commitments) {
    $scope.global = Global;

 $scope.acta = {};
 $scope.acta.attendance = [{
     name:'',
     appointment:'',
     note:''
 }];
 
 $scope.acta.commitment = [{
     deadline:'',
     committed:'',
     description:''
 }];


 
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

    $scope.addItem = function() {
        $scope.acta.attendance.push({
            name: '',
            appointment: '',
            note: ''
        });
    };
    
    $scope.addCommit = function() {
        $scope.acta.commitment.push({
            deadline: '',
            committed: '',
            description: ''
        });
    };
    $scope.create = function(isValid) {
      alert(angular.toJson($scope.acta));
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
    
    $scope.findCommitments = function() {
        
      Commitments.query(function(commitments) {
        $scope.commitments = commitments;//[{x:"s",y:"d"},{x:"r", y:"e"}];
      
      });
  
    };

    $scope.findOne = function() {
      Actas.get({
        actaId: $stateParams.actaId
      }, function(acta) {
        $scope.acta = acta;
      });
    };
    
    
    $scope.print = function() {
      alert("print");
      var myWindow = window.open('', '', 'width=800, height=600');
    myWindow.document.write("Hola");
    myWindow.print();
    };
    
    
    $scope.download = function(acta){
      alert("DONWLOAD");
        acta.$download(function(response) {
         
          $location.path('actas');
        });
     
    };
    
  }
]);