// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngStorage', 'starter.directives'])

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

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider){
  
  $httpProvider.defaults.withCredentials = true;
  // console.log("check");
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
          controller: 'FavouritesCtrl'
        }
      }
    })
  
  .state('tab.cart', {
      url: '/cart',
      views: {
        'tab-cart': {
          templateUrl: 'templates/tab-cart.html',
          controller: 'CartCtrl'
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
  
    .state('tab.profile', {
    url: '/profile',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-profile.html',
        controller: 'ProfileCtrl'
      }
    }
  })
  
  .state('tab.trialPages', {
    url: '/trialPages',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-trialPages.html',
      }
    }
  })
  
    .state('tab.accountSettings', {
    url: '/accountSettings',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-accountSettings.html',
      }
    }
  })
  
    .state('tab.orderHistory', {
    url: '/orderHistory',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-orderHistory.html'
      }
    }
  })
  
  .state('tab.orderSummary', {
    url: '/orderSummary',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-orderSummary.html'
      }
    }
  })
  
  .state('tab.inviteFriends', {
    url: '/inviteFriends',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-inviteFriends.html',
      }
    }
  })
  
  .state('tab.about', {
    url: '/about',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-about.html',
      }
    }
  })
  
  .state('tab.contactUs', {
    url: '/contactUs',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-contactUs.html',
      }
    }
  })
  
  .state('tab.shippingPolicy', {
    url: '/shippingPolicy',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-shippingPolicy.html',
      }
    }
  })
  
  .state('tab.awaitingConfirmation', {
    url: '/awaitingConfirmation',
    views: {
      'tab-cart': {
        templateUrl: 'templates/tab-awaitingConfirmation.html',
        controller:'awaitingConfirmationCtrl'
      }
    }
  })
  
  .state('tab.confirmation', {
    url: '/confirmation',
    views: {
      'tab-cart': {
        templateUrl: 'templates/tab-confirmation.html'
      }
    }
  })
  
  .state('tab.successfulPayment', {
    url: '/successfulPayment',
    views: {
      'tab-cart': {
        templateUrl: 'templates/tab-successfulPayment.html',
      }
    }
  })
  
  .state('tab.failedPayment', {
    url: '/failedPayment',
    views: {
      'tab-cart': {
        templateUrl: 'templates/tab-failedPayment.html',
      }
    }
  });
  
  $urlRouterProvider.otherwise('/tab/home');
  $ionicConfigProvider.tabs.position('bottom');

})

.controller('SearchCtrl', function($scope, $ionicModal) {
  // console.log("modal is being called");
  
  $ionicModal.fromTemplateUrl('templates/search.html', function($ionicModal) {
        $scope.modal = $ionicModal;
    }, {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope,
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
    });  
})

.controller('LocationCtrl', function($scope, $ionicModal) {
  // console.log("modal is being called");
  
  $ionicModal.fromTemplateUrl('templates/location.html', function($ionicModal) {
        $scope.modal = $ionicModal;
    }, {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope,
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
    }); 
	    
	    	// if(!!navigator.geolocation) {
	    	
	    	// 	var map;
	    	
		    // 	var mapOptions = {
		    // 		zoom: 15,
		    // 		mapTypeId: google.maps.MapTypeId.ROADMAP
		    // 	};
		    	
		    // 	map = new google.maps.Map(document.getElementById('google_canvas'), mapOptions);
	    	
	    	// 	navigator.geolocation.getCurrentPosition(function(position) {
	    		
		    // 		var geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		    		
		    // 		var infowindow = new google.maps.InfoWindow({
		    // 			map: map,
		    // 			position: geolocate,
		    // 			content:
		    // 				'<h1>Location pinned from HTML5 Geolocation!</h1>' +
		    // 				'<h2>Latitude: ' + position.coords.latitude + '</h2>' +
		    // 				'<h2>Longitude: ' + position.coords.longitude + '</h2>'
		    // 		});
		    		
		    // 		map.setCenter(geolocate);
		    		
	    	// 	});
	    		
	    	// } else {
	    	// 	document.getElementById('google_canvas').innerHTML = 'No Geolocation Support.';
	    	// }
	    	
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
