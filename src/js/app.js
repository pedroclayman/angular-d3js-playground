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
          { id: 1, label: 'A', value: 1 },
          { id: 2, label: 'B', value: 2 },
          { id: 3, label: 'C', value: 4 }
        ]
      };

      $scope.addNewNumber = function() {
        console.log('push it');
      }
    }
  ]);

  angular.module('ng-d3').directive('sunburst', [

    function sunburstDirective() {

      var render = function(svg, data) {
        var sum = 0;
        for (var i = 0; i < data.length; i++) {
          sum += data[i].value;
        }

        var fullAngle = 2*Math.PI;

        var arc = d3.svg.arc()
                    .outerRadius(200)
                    .innerRadius(170);

        var colors = d3.scale.category20c();
        var angle = d3.scale.linear()
                      .domain([0, sum])
                      .range([0, fullAngle]);

        var lastAngle = 0;

        svg.attr('transform', 'translate(200,200)')
        .selectAll("path.src")
          .data(data)
            .enter()
              .append('path')
                .attr('class', 'src')
                .attr('fill', function(d,i) { return colors(i); })
                .attr('d', function(d,i) {
                  var start = lastAngle;
                  var end = lastAngle = start + angle(d.value);

                  console.log('start', start);
                  console.log('end', end);

                  var result = arc({
                      startAngle: start,
                      endAngle: end,
                    },i);

                  return result;

                });
                console.log('aaa');
      };

      return {
        restrict: 'A',
        scope: {
          options: "=sunburst"
        },
        link: function(scope, element, attrs) {
          element.css({ width: scope.options.width, height: scope.options.height })
          var svg = d3.select(element[0])
                      .append('svg')
                      .attr('width', scope.options.width)
                      .attr('height', scope.options.height)
                      .append('g');

          scope.$watchCollection('options.data',
            function(newVal) {
              svg.selectAll('*').remove();

              if (!newVal) {
                return;
              }
              console.log('link');
              render(svg, newVal);

            }
          )

        }
      };
    }
  ]);
})();
