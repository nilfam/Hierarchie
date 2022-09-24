'use strict';

angular.module('hierarchie.controllers', ['hierarchie.services'])
// Main controller for application. Handles loading of data, assignment of colors, and display switching
.controller('MainCtrl', ['$scope', '$http', 'version', '$location',
  function($scope, $http, version, $location) {
    $scope.scopedAppVersion = version;
    $scope.data;
    $scope.displayVis = false;
    $scope.currentnode;
    $scope.color;
    // Browser onresize event
    window.onresize = function() {
      $scope.$apply();
    };
    // Changes between the sunburst and partition views
    $scope.display = function(vis) {
      if (vis === "part") {
        $scope.displayVis = true;
        $scope.$broadcast('renderPartition');
      } else {
        $scope.displayVis = false;
        $scope.$broadcast('renderSunburst');
      }
    };
    // Traverses the data tree assigning a color to each node. This is important so colors are the
    // same in all visualizations
    $scope.assignColors = function(node) {
      $scope.getColor(node);
      _.each(node.children, function(c) {
        $scope.assignColors(c);
      });
    };
    // Calculates the color via alphabetical bins on the first letter. This will become more advanced.
    $scope.getColor = function(d) {
      d.color = $scope.color(d.words[0]);
    };

    $scope.color = d3.scale.ordinal().range(["#33a02c", "#1f78b4", "#b2df8a", "#a6cee3", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#6a3d9a", "#cab2d6", "#ffff99"]);

    var fileName = new URLSearchParams(window.location.search).get('file')
    if (fileName === undefined || fileName === null || fileName === '')
      fileName = 'maori-all-5-levels-1-it.json';

    // Other options:
    // maori-5000-10-levels.json
    // maori-all-3-levels-100-its.json
    // maori-all-5-levels-1-it.json

    console.log('Loading file: ' + fileName);

    // Load data
    $http({
      method: 'GET',
      url: 'app/data/' + fileName
    }).
    success(function(root, status, headers, config) {
      $scope.assignColors(root);
      $scope.data = root;
    }).
    error(function(data, status, headers, config) {
      alert("Error loading data from file " + fileName + ". Possibly file not found. Request status = " + status);
    });

    $scope.about = function() {
      $location.path("/about");
    }
  }
])
.controller('FccCtrl', ['$scope', '$http', 'version', '$location',
  function($scope, $http, version, $location) {
    $scope.scopedAppVersion = version;
    $scope.data;
    $scope.displayVis = false;
    $scope.currentnode;
    $scope.color;
    // Browser onresize event
    window.onresize = function() {
      $scope.$apply();
    };

    // Traverses the data tree assigning a color to each node. This is important so colors are the
    // same in all visualizations
    $scope.assignColors = function(node) {
      $scope.getColor(node);
      _.each(node.children, function(c) {
        $scope.assignColors(c);
      });
    };
    // Calculates the color via alphabetical bins on the first letter. This will become more advanced.
    $scope.getColor = function(d) {
      d.color = $scope.color(d.words[0]);
    };

    $scope.color = d3.scale.ordinal().range(["#33a02c", "#1f78b4", "#b2df8a", "#a6cee3", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#6a3d9a", "#cab2d6", "#ffff99"]);

    // Load dats

    $http({
      method: 'GET',
      url: "app/data/fccdata.json"
    }).
    success(function(data, status, headers, config) {
      // Do a little minipulation of the data formatting to create a valid root
      var root = {
        name: "FCC",
        children: data.topic_data,
        words: ["FCC"]
      };
      $scope.assignColors(root);
      $scope.fccdata = root;
    }).
    error(function(data, status, headers, config) {
      console.log("Error loading data!" + status);
    });

    $scope.about = function() {
      $location.path("/about");
    }
  }
])
