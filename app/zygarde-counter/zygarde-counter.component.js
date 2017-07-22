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
        } // else {

        /* Update progress bar */
        self.updateProgressBar();

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

      }); //end of page initilation

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

      /* Updates progress bar based current number of collected cells */
      self.updateProgressBar = function () {
        // Get current progress value
        var progress = self.progress;
        var progressPercent = "" + progress + "%";
        var progressText = "" + progress + "/100";
        // Update progressBar value
        $("#progressBar").css("width", "" + progressPercent);
        $("#progressBar").html(progressText);
      } //updateProgressBar()

      /* Create a select bar for cells in progress */
      self.setupPending = function () {
        // Get variables
        var cells = self.cells;
        var collected = JSON.parse(localStorage.getItem("collected"));
        var len = 100; //number of possible cells

        // Grab DOM to set up select
        var select = document.getElementById('currentSelect')
        // Clear the current select options to remake the updated version
        select.innerHTML = '';

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
      }; //setupPending()

      /* Generates the page for the current cell being tracked */
      self.showCurrent = function () {
        /* Get current selected value (function called every 'onchange')*/
        var e = document.getElementById("currentSelect");
        var id = e.options[e.selectedIndex].value;
        //var island = e.options[e.selectedIndex].text;
        //console.log("current Cell: " + id);

        /* Get values from cell array */
        var cells = self.cells;
        var img = cells[id]['file'];
        var island = cells[id]['island'];
        var location = cells[id]['location'];
        var notes = cells[id]['notes'];

        /* Update table values */
          // img
          $("#currentImg").attr("src", img);
          var currentImg = document.getElementById('currentImg');
          (function () {
            currentImg.addEventListener('click', function () {self.openModalImage(img, island);}, false);
          }());

          // location
          $("#currentLocation").html(location);

          // notes
          $("#currentNotes").html(notes);

          // collect button
          $('#collectButton').unbind('click'); // unbind old onclick function
          $('#collectButton').click(function(){ // bind new onclick function!
            self.collectCell(id);
          });
          /*var collectButton = document.getElementById('collectButton');
          (function () {
            collectButton.addEventListener('click', function () {self.collectCell(id);}, false);
          }());*/

      }; //self.showCurrent()


      /* Generates a list of collected cells (with an option to remove those mistakenly collected)*/
      self.showCollected = function () {
        // Get variables
        var cells = self.cells;
        var collected = JSON.parse(localStorage.getItem("collected"));
        var len = 100; //number of possible cells

        // Grab DOM table
        var table = document.getElementById("collectedBody");
        table.innerHTML = '';

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

      /* Returns a cell back to the select options and removes it from the collected array */
      self.collectCell = function (cellId) {
        // set cell collected as 'true' in localStorage
        var collected = JSON.parse(localStorage.getItem("collected"));
        collected[cellId] = true;

        // update progress bar
        self.progress +=1;
        self.updateProgressBar();

        // show next cell to be collected

          // if all cells have already been collected
          if (self.progress == 100){
            // TODO: Add spash screen for journey's end
            console.log("Congratulations! You have collected all the cells! ");
          }
          // change select option to next value
          else {
            // if next option exists in select, set it as the current select
            var selected_element = $('#currentSelect').find('option:selected');
            selected_element.removeAttr('selected');
            selected_element.next().attr('selected', 'selected');
            $('#currentSelect').val(selected_element.next().val());

            // update view
            self.showCurrent();
          }

        // update localStorage
        localStorage.setItem("collected", JSON.stringify(collected));

      }; // collectCell()

      /* Returns a cell back to the select options and removes it from the collected array */
      self.undoCell = function (cellId) {
        console.log("Undo Cell # " + cellId);
      }; // undoCell()

      /* End of functions */
    }]
  });
