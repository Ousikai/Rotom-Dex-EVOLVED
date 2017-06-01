'use strict';

var app = angular.module('Rotom-Dex-Evolved', [
  'ngRoute',
  'ui.bootstrap',
  'zygardeCounter'
]);

app.directive('scrollOnClick', function() {
  return {
    restrict: 'EA',
    template:'<a id="scrolltag" title="Click here to go top" class="scrollup">Scroll</a>',
    link: function(scope, $elm) {
      var scrollObject = {};
      var scrollElement = document.getElementById('scrolltag');
			window.onscroll = getScrollPosition;

      scrollElement.addEventListener("click", scrollToTop, false);

			function getScrollPosition(){
        scrollObject = {
           x: window.pageXOffset,
           y: window.pageYOffset
        }
        if(scrollObject.y > 300) {
            scrollElement.classList.add("visible");
        } else {
            scrollElement.classList.remove("visible");
        }
    	}

      function scrollToTop() {
        var scrollDuration = 500;
        var scrollStep = -window.scrollY / (scrollDuration / 15);
        var scrollInterval = setInterval(function(){
          if (window.scrollY != 0) {
            window.scrollBy(0, scrollStep);
          } else {
            clearInterval(scrollInterval);
          }
        },15);
      }

    }
  }
});
