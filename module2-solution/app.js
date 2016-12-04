(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var buyList = this;

  buyList.items = ShoppingListCheckOffService.getItems();

  buyList.buyItem = function (itemIndex) {
    ShoppingListCheckOffService.buyItem(itemIndex);
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtList = this;

  boughtList.items = ShoppingListCheckOffService.getBoughtItems();

}


function ShoppingListCheckOffService() {
  var service = this;

  var items = [
    {
      name: "Burgers",
      quantity: "10"
    },
    {
      name: "Pies",
      quantity: "3"
    },
    {
      name: "Pizzas",
      quantity: "2"
    },
    {
      name: "Choco-Bars",
      quantity: "4"
    },
    {
      name: "Brownies",
      quantity: "5"
    },
    {
      name: "Croisants",
      quantity: "8"
    }
  ];

  var boughtItems = [];

  service.buyItem = function (itemIndex) {
    var item = {
      name: items[itemIndex].name,
      quantity: items[itemIndex].quantity
    };
    boughtItems.push(item);

    items.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return items;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };
}

})();
