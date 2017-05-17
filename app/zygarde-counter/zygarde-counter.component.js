'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('zygardeCounter').
  component('zygardeCounter', {
    templateUrl: 'zygarde-counter/zygarde-counter.template.html',
    controller: ['$http', function ZygardeCounterController($http) {
      var self = this;
      self.orderProp = 'island';
      $http.get('zygarde-counter/zygarde-cells.json').then(function(response) {
        self.cells = response.data;
      });
    }]
  });
