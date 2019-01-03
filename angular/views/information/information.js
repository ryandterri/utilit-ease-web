angular.module('utilit-ease').config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('information', {
        url: '/faq',
        templateUrl: '/views/information/information.html',
        controller: [function() {
            var ctrl = this;
        }],
        controllerAs: 'ctrl'
    });
}]);
