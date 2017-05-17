'use strict';

angular.
  module('Rotom-Dex-Evolved').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');
      $routeProvider.
        when('/phones', {
          template: '<phone-list></phone-list>'
        }).
        when('/phones/:phoneId', {
          template: '<phone-detail></phone-detail>'
        }).
        when('/zygarde', {
          template: '<zygarde-counter></zygarde-counter>'
        }).
        otherwise('/phones');
    }
  ]);
