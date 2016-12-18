(function () {
'use strict';

angular.module('MenuApp')
.component('items', {
  templateUrl: 'templates/items.html',
  bindings: {
    items: '<'
  }
});

})();
