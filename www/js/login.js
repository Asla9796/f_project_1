// var server = "http://10.21.209.31:9000/";
var server = "http://litsoc.saarang.org/";
var ldapLogin = "http://10.24.0.224/mobapi/ldap/login.php";
angular.module('login', ['ionic'] )
.controller('PopupCtrl',function($scope, $location, $http, $ionicPopup, $ionicLoading) {

  var storageTestKey = 'sTest',
    storage = window.sessionStorage;

// Checking for private modes in iOS
  try {
    storage.setItem(storageTestKey, 'test');
    storage.removeItem(storageTestKey);
  } catch (e) {
    if (e.code === DOMException.QUOTA_EXCEEDED_ERR && storage.length === 0) {
      // private mode
      var alertPopup = $ionicPopup.alert({
             title: 'Error!',
             template: "Turn off private mode to use this page."
            });
    } else {
      throw e;
    }
  }

   $scope.showAlert = function(user) {
    // $localStorage.user = user;
     // window.localStorage.setItem('user', user);
  
   // An alert dialog
   $scope.showAlert = function(user) {
     $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
     
     var username = user.username;
     var password = user.password;
     var data = { roll: username, pass: password};
    console.log(data);
     if (username && password){
  		
      var loginReq = {
       method: 'POST',
       url: ldapLogin,
       data : data,
       transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
        },
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
       }
    };
    console.log(data);
      $http( loginReq).
          then(function(response) {
          // this callback will be called asynchronously
          // when the response is availa 
          console.log(response);
          var user = response.data[0];
          $http.post( server + 'auth/local/', 
          { 
            rollNumber: user.username, password : 'password', hostel : user.hostel, name : user.fullname }).
            then(function(response) {
            // this callback will be called asynchronously
            // when the response is availa 
            console.log(response.data);
            // window.localStorage.setItem('data', response.data);
            window.localStorage.setItem('token', response.data.token);
            location.replace('index.html');
          },
           function(response) {
            console.log(Error);
            console.log(response);
            var Popup = (response.data.message);
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
             title: 'Error!',
             template: Popup
            });
            
          });

          // window.localStorage.setItem('data', response.data);
          // window.localStorage.setItem('token', response.data.token);
          // location.replace('home.html');
        },
         function(response) {
          console.log("Error");
          console.log(response);
          // console.log(response);
          var Popup = (response.data.message);
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
           title: 'Error!',
           template: Popup
          });
          
        });	
    }
     else{

        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({
       title: 'Error!',
       template: 'Invalid username and password'
    });
     }
   
   };
  
};
});