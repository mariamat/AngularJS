(function() {
'use strict';

angular.module('MenuApp')
  .component('categories', {
    templateUrl: 'templates/categories.html',
    bindings: {
      items: '<'
    }
  });

})();
