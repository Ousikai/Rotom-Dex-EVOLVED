'use strict';

angular.
  module('Rotom-Dex-Evolved').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');
      $routeProvider.
        when('/zygarde', {
          template: '<zygarde-counter></zygarde-counter>'
        }).
        otherwise('/zygarde');
    }
  ]);
