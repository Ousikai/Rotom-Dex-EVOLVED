'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('zygardeCounter').
  component('zygardeCounter', {
    templateUrl: 'zygarde-counter/zygarde-counter.template.html',
    controller: ['$http', function ($http) {
      var self = this;
      self.orderProp = "'id'*1";
      $http.get('zygarde-counter/zygarde-cells.json').then(function(response) {
        self.cells = response.data;
      });
      self.openModalImage = function openModalImage(imgSrc, imgAlt) {
        // Get the modal, image, and caption text
        var modal = document.getElementById('myModal');
        var modalImg = document.getElementById("modalImg");
        var captionText = document.getElementById("caption");
        modal.style.display = "block";
        modalImg.src = imgSrc;
        captionText.innerHTML = imgAlt;
      };
    }]
  });
