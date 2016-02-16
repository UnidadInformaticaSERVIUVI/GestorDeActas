'use strict';

//Setting up route
angular.module('mean.actas').config(['$stateProvider',
  function($stateProvider) {

    // states for my app
    $stateProvider
      .state('all actas', {
        url: '/actas',
        templateUrl: '/actas/views/list.html',
        requiredCircles : {
          circles: ['authenticated'],
          denyState: 'auth.login'
        }
      })
      .state('create acta', {
        url: '/actas/create',
        templateUrl: '/actas/views/create.html',
        requiredCircles : {
          circles: ['can create content']
        }
      })
      .state('edit acta', {
        url: '/actas/:actaId/edit',
        templateUrl: '/actas/views/edit.html',
        requiredCircles : {
          circles: ['can edit content']
        }
      })
      .state('acta by id', {
        url: '/actas/:actaId',
        templateUrl: '/actas/views/view.html',
        requiredCircles : {
          circles: ['authenticated'],
          denyState: 'auth.login'
        }
      });
  }
]);
