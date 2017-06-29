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
      self.collectCell = function collectCell(cellId) {
        console.log("Collected Cell # " + cellId);
      };
      self.showCollected = function updateCollected() {
        console.log("Here's all of them!");
        /* Get collectedCells information from localStorage */
        var cellsCollected = ["Saab", "Volvo", "BMW"];
        var arrayLength = cellsCollected.length;
        /* Reset and update div */
        var div = document.getElementById('collectedCells');
        div.innerHTML = ''
        for (var i = 0; i < arrayLength; i++) {
          /*
          var content  = document.createTextNode(cellsCollected[i]);
          div.appendChild(content);*/
        }
        /* Show/Hide collected cells <div>
        var showhide = document.getElementById('collectedCells').style;
        (showhide.display = showhide.display == "none" ?  "block" : "none" );
        */
      };
    }]
  });
