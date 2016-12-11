(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController )
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        found: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'list',
      bindToController: true
    };
    return ddo;
}

function FoundItemsDirectiveController() {
    var list = this;

    list.isEmpty = function() {
      return list.found != undefined && list.found.length === 0;
    }
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrow = this;

  narrow.narrowIt = function(){
    if (narrow.searchTerm === "") {
        narrow.items = [];
        return;
    }
    var promise = MenuSearchService.getMatchedMenuItems(narrow.searchTerm);

      promise.then(function (response) {
        narrow.items = response;
      })
      .catch(function (error) {
        console.log("Something went wrong...");
      });
    };
    narrow.removeItem = function(index) {
      narrow.items.splice(index, 1);
    };
  }

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function(result){

      var items=result.data.menu_items;
      var foundItems = [];

        for (var i = 0; i < items.length; i++) {
          if (items[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0) {
            foundItems.push(items[i]);
          }
        }
        return foundItems;
    });
};
}

})();
