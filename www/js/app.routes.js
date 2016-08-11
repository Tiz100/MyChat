/*
angular
  .module('starter')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'js/views/chat.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
*/
  (function () {
    'use strict';

    angular.module('starter').config(['$routeProvider', function ($routeProvider) {

        var routes = [
        {
            url: '/',
            config: {
                templateUrl: "js/templates/tab-account.html",
            }
        },
        {
            url: '/menu',
            config: {
                templateUrl: "js/views/mainmenu.html",
            }
        },
        ];
        
        routes.forEach(function (route) {
            $routeProvider.when(route.url, route.config);
        });

        $routeProvider.otherwise({ redirectTo: '/' });

    }]);
}());