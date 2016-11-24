(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {

  $scope.string = "";
  $scope.totalItems = 0;

  $scope.displayNumeric = function () {
    var totalNameItems = calculateItems($scope.string);
    var ourMessage = sayMessage(totalNameItems);
    if (ourMessage=="Too much!" || ourMessage=="Enjoy!") {
      $scope.MessageColor = "green";
    }
    else if (ourMessage=="Please enter data first") {
      $scope.MessageColor = "red";
    }

    $scope.totalItems = totalNameItems;
    $scope.outputMessage = ourMessage;
  };

  function filterNull(value){
    return value != " ";
  }

  function calculateItems(string) {
    var totalStrings  = 0;
    if (string=="") {

    } else {
      totalStrings =string.replace(/\s+/g,' ').split(",").filter(filterNull).filter(function(e){return e}).length;
    }
    return totalStrings ;
  };

  function sayMessage(items) {
    if (items>3) {
      //$scope.MessageColor = "green";
      return "Too much!";
    }
    else if (items==0) {
    //  $scope.MessageColor = "red";
      return "Please enter data first";
    }
    else {
    //  $scope.MessageColor = "green";
      return "Enjoy!";
    }

  };

  $scope.feed = function () {
    $scope.stateOfBeing = "fed";
  };
}

})();
