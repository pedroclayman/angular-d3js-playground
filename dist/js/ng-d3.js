(function() {
  'use strict';

  angular.module('ng-d3', []);

  angular.module('ng-d3').controller('main', [
    '$scope',
    function($scope) {
      $scope.options = {
        width: '100%',
        height: '100%',
        data: [
          {
            label: 'Foo',
            amount: 100
          },
          {
            label: 'Bar',
            amount: 200
          },
          {
            label: 'Tar',
            amount: 300
          }
        ]
      };
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
                      .attr('height', scope.options.height);


        }
      };
    }
  ]);
})();
