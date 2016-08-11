
 //angular.module is a global place for creating, registering and retrieving Angular modules
 //'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
 //the 2nd parameter is an array of 'requires'
 //'starter.services' is found in services.js
 //'starter.controllers' is found in controllers.js


angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'
    //, 'ngRoute'
    //, 'pubnub.angular.service', 'ngNotify'
])


.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // State to represent Login View
    .state('login', {
        url: "/login",
        templateUrl: "templates/login.html",
        controller: 'LoginCtrl'
    })

    // setup an abstract state for the tabs directive
    .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
    })

    // Each tab has its own nav history stack:

    .state('tab.rooms', {
        url: '/rooms',
        views: {
            'tab-rooms': {
                templateUrl: 'templates/tab-rooms.html',
                controller: 'RoomsCtrl'
            }
        }
    })

    .state('tab.chat', {
        url: '/chat',
        views: {
            'tab-chat': {
                templateUrl: 'templates/tab-chat.html',
                controller: 'ChatCtrl'
            }
        }
    })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

})
    //.run(['Pubnub', 'currentUser', function (Pubnub, currentUser) {
    //    Pubnub.init({
    //        publish_key: 'pub-c-65cf2800-d79d-4148-af96-e8821c984109',
    //        subscribe_key: 'sub-c-30916d88-4ffc-11e6-971e-02ee2ddab7fe',
    //        //publish_key: 'pub-c-a1cd7ac1-585e-478e-925b-65d17ce62f7d',
    //        //subscribe_key: 'sub-c-204f063e-c559-11e5-b764-02ee2ddab7fe',
    //        uuid: currentUser,
    //        origin: 'pubsub.pubnub.com',
    //        ssl: true
    //    });

    //}])

    //.run(['ngNotify', function (ngNotify) {
    //    ngNotify.config({
    //        theme: 'paster',
    //        position: 'top',
    //        duration: 250
    //    });

    //}])
;






