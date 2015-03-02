(function() {
  'use strict';

  angular.module('ng-d3', []);

  angular.module('ng-d3').controller('main', [
    '$scope',
    function($scope) {
      $scope.options = {
        width: '100%',
        height: '100%',
        data: [1,2,3,5,8,13,21]
      };

      $scope.addNewNumber = function() {
        console.log('push it');
        $scope.options.data.push(100);
      }
    }
  ]);

  angular.module('ng-d3').directive('sunburst', [

    function sunburstDirective() {

      return {
        restrict: 'A',
        scope: {
          options: "=sunburst"
        },
        link: function(scope, element, attrs) {
          element.css({ width: scope.options.width, height: scope.options.height })
          var vis = d3.select(element[0])
                      .append('svg')
                      .attr('width', scope.options.width)
                      .attr('height', scope.options.height)
                      .append('g');
          
          scope.$watchCollection('options.data',
            function(newVal) {
              vis.selectAll('*').remove();
              console.log('aaa');

              if (!newVal) {
                return;
              }

              // todo check this out http://briantford.com/blog/angular-d3
              d3.select("body").selectAll("p")
                .data(scope.options.data)
              .enter().append("p")
                .text(function(d) { return "I’m number " + d + "!"; });
            }
          )

        }
      };
    }
  ]);
})();
