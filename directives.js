// <grid-container resource="/api/data.js">
//     <grid-col name="Name" field="name"></grid-col>
//     <grid-col name="Age" field="age"></grid-col>
//     <grid-col name="Height" field="height"></grid-col>
//   </grid-container>
var app = angular.module('sample');


app.directive('gridContainer', function() {
  return {
    restrict: 'E',
    controller: function($scope, $http) {
      $scope.order = 'name';
      $scope.cols = [];
      $scope.rows = [];

      this.addCol = function(col) {
        $scope.cols.push(col);
      }

      $scope.setOrder = function(fieldName) {
        $scope.order = $scope.order === fieldName? '-' + fieldName: fieldName;
      }

      $http.get('/api/data.json').success(function(response) {
        console.log(response);
        $scope.rows = response.data;
      })

    },
    link: function(scope, el, attr) {
      console.log('link for container')
    },
    transclude: true,
    templateUrl: './autoComplete.html'
  }
});

app.directive('gridCol', function() {
  return {
    restrict: 'E',
    require: '^gridContainer',
    link: function(scope, el, attr, gridContainerCTRL) {
      var data = {
        name: attr.name,
        field: attr.field
      };

      console.log(data);
      gridContainerCTRL.addCol(data);

    }
  }
})