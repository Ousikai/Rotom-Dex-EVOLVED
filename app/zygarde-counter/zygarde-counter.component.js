'use strict';
// Register `zygardeCounter` component, along with its associated controller and template
angular.
  module('zygardeCounter').
  component('zygardeCounter', {
    templateUrl: 'zygarde-counter/zygarde-counter.template.html',
    controller: ['$http', function ($http) {
      var self = this;

      /* Initialize webpage, create new localStorage and variable if initial visit */
      $http.get('zygarde-counter/zygarde-cells.json').then(function(response) {
        /* Parse JSON data */
        self.cells = response.data;
        var cells = self.cells;
        var len = self.cells.length;

        /* Start counter at 0 */
        self.progress = 0;

        /* Check if localStorage exists for client */
        if (localStorage.getItem("collected") === null) {
          console.log("Creating local cell tracker");
          var collected = [];

          /* Start off with no locations collected */
          for (var i = 0; i < len; i++) {
            var id = cells[i]['id'];
            collected[id] = false;
          }

          /* store cell tracker in local storage */
          localStorage.setItem("collected", JSON.stringify(collected));
        }

        /* localStorage exists! Now to continue where the client left off... */
        else {

          /* Get progress array from "collected" */
          var collected = JSON.parse(localStorage.getItem("collected"));
          var progress = 0;

          /* Cell was collected if 'true'*/
          for (var i = 0; i < len; i++) {
            if(collected[i]){
              progress+=1;
            }
          }

          /* Update progress bar */
          self.progress = progress;
        }

        /* Setup SELECT options */
          // Set up onchange function
          var currentSelect = document.getElementById('currentSelect');
          currentSelect.onchange = function(){self.showCurrent();};

          // Set up select options
          self.setupPending();

        /* Show current cell in SELECT */
        self.showCurrent();

        /* Show collected cells */
        self.showCollected();
      });
      /* Click on image opens it as a modal */
      self.openModalImage = function (imgSrc, imgAlt) {
        // Get the modal, image, and caption text
        var modal = document.getElementById('myModal');
        var modalImg = document.getElementById("modalImg");
        var captionText = document.getElementById("caption");
        console.log("imgSrc: " + imgSrc);
        console.log("imgAlt: " + imgSrc);
        modal.style.display = "block";
        modalImg.src = imgSrc;
        captionText.innerHTML = imgAlt;
      };
      self.setupPending = function () {
        // Get variables
        var self = this;
        var cells = self.cells;
        var collected = JSON.parse(localStorage.getItem("collected"));
        var len = 100; //number of possible cells

        // Grab DOM to set up select
        var select = document.getElementById('currentSelect');

        // Loop through collected cells
        for (var i = 0; i < len; i++) {
          // If this cell has not been collected yet, add as select option
          if (!collected[i]){
            var optionValue = document.createElement("option");
            optionValue.setAttribute("value", i);
            var optionText = document.createTextNode(cells[i]['island']);
            optionValue.appendChild(optionText);
            select.appendChild(optionValue);
          }
        }

        //console.log("Collected Cell # " + cellId);
      };
      self.showCurrent = function () {
        var e = document.getElementById("currentSelect");
        var id = e.options[e.selectedIndex].value;
        //var island = e.options[e.selectedIndex].text;
        console.log("current Cell: " + id);
      };
      self.showCollected = function () {
        // Get variables
        var self = this;
        var cells = self.cells;
        var collected = JSON.parse(localStorage.getItem("collected"));
        var len = 100; //number of possible cells

        // Grab DOM table
        var table = document.getElementById("collectedBody");

        for (var i = 0; i < len; i++) {
          // If this cell has already been collected
          if (collected[i]){
            // Create an empty <tr> element and add it to the 1st position of the table:
            var row = table.insertRow(-1);

            // Insert new cells (<td> elements) to the "new" <tr> element:
            var imageCell = row.insertCell(-1);
            var islandCell = row.insertCell(-1);
            var locationCell = row.insertCell(-1);
            var undoCell = row.insertCell(-1);

            // Add relevant content to imageCell
            var img = document.createElement('img');
            (function () {
              var imgSrc = cells[i]["file"];
              var imgAlt = cells[i]["island"];
              img.src = imgSrc;
              img.height = 200;
              img.width = 200;
              img.alt = imgAlt;
              img.addEventListener('click', function () {self.openModalImage(imgSrc, imgAlt);}, false);
            }());
            imageCell.appendChild(img);

            // Add relevant content to islandCell
            islandCell.innerHTML = cells[i]["island"];

            // Add relevant content to locationCell
            locationCell.innerHTML = cells[i]["location"];

            // Add relevant content to undoCell
            undoCell.innerHTML = "<i class='glyphicon glyphicon-remove-sign fa-3x' aria-hidden='true'/>";
            (function () {
              var id = cells[i]["id"];
              undoCell.addEventListener('click', function () {self.undoCell(id);}, false);
            }());
          } // if (collected[i]){
        } // for (var i = 0; i < len; i++){}
      };
      self.undoCell = function (cellId) {
        console.log("Collected Cell # " + cellId);
      };
    }]
  });
