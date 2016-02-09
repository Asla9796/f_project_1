// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'firebase'])

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
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  console.log("check");

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  // .state('tab.events', {
  //   url: '/events',
  //   views: {
  //     'tab-events': {
  //       templateUrl: 'templates/tab-events.html',
  //       controller: 'EventsCtrl'
  //     }
  //   }
  // })

  // .state('tab.calendar', {
  //     url: '/calendar',
  //     views: {
  //       'tab-calendar': {
  //         templateUrl: 'templates/tab-calendar.html',
  //         controller: 'CalendarCtrl'
  //       }
  //     }
  //   })
    
  // .state('tab.scoreboard', {
  //     url: '/scoreboard',
  //     views: {
  //       'tab-scoreboard': {
  //         templateUrl: 'templates/tab-scoreboard.html',
  //         controller: 'ScoreboardCtrl'
  //       }
  //     }
  //   })  

  // .state('tab.clubs', {
  //   url: '/clubs',
  //   views: {
  //     'tab-clubs': {
  //       templateUrl: 'templates/tab-clubs.html',
  //       controller: 'ClubsCtrl'
  //     }
  //   }
  // })
  
  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('tab.favourites', {
      url: '/favourites',
      views: {
        'tab-favourites': {
          templateUrl: 'templates/tab-favourites.html',
        }
      }
    })
  
  .state('tab.cart', {
      url: '/cart',
      views: {
        'tab-cart': {
          templateUrl: 'templates/tab-cart.html',
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

    .state('tab.resto', {
    url: '/resto',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-resto.html',
        controller:'RestoDetailsCtrl'
      }
    }
  })  

    .state('tab.menu', {
    url: '/menu',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-menu.html',
        controller: 'MenuCtrl'
      }
    }
  });
  
  // .state('tab.eventdetails', {
  //     url: "/eventdetails",
  //     views: {
  //       'tab-events': {
  //         templateUrl: "templates/tab-eventdetails.html",
  //         controller: "EventDetailsCtrl"
  //       }
  //     }
  //   })
    
  //   .state('tab.eventdetailsCalendar', {
  //     url: "/eventdetailsCalendar",
  //     views: {
  //       'tab-calendar': {
  //         templateUrl: "templates/tab-eventdetails.html",
  //         controller: "EventDetailsCtrl"
  //       }
  //     }
  //   })
    
  //   .state('tab.clubdetails', {
  //     url: "/clubdetails",
  //     views: {
  //       'tab-clubs': {
  //         templateUrl: "templates/tab-clubdetails.html",
  //         controller: "ClubDetailsCtrl"
  //       }
  //     }
  //   });

    
  //   // .state('tab.scoreboard.litsoc', {
    //     url: "/litsoc",
    //     views: {
    //         'tab-scoreboard-litsoc': {
    //             templateUrl: "templates/litsoc.html"
    //         }
    //     }
    // })
    
    // // .state('tabs.scoreboard.techsoc', {
    //     url: "/techsoc",
    //     views: {
    //         'tab-scoreboard': {
    //             templateUrl: "templates/techsoc.html"
    //         }
    //     }
    // });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});

// .filter('orderObjectBy', function() {
//   return function(items, field, reverse) {
//     var filtered = [];
//     angular.forEach(items, function(item) {
//       filtered.push(item);
//     });
//     filtered.sort(function (a, b) {
//       return (a[field] > b[field] ? 1 : -1);
//     });
//     if(reverse) filtered.reverse();
//       return filtered;
//     };
// });

/**
 * Created by Saurabh on 22/1/14.
 * Directive for a drop down menu.
 */
