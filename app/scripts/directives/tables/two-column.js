'use strict';
angular.module('contantsListApp').directive('tables/twoColumn', function() {
    return {
        template: '<div></div>',
        restrict: 'E',
        link: function postLink(scope, element) {
            element.text('this is the tables/twoColumn directive');
        }
    };
});
