var server = "https://data.sqippr.com/api/";

angular.module('starter.controllers', ['ionic','ngStorage', 'starter.services', 
                                        'angular-svg-round-progressbar', 'starter.directives', 
                                        'ui.timepicker'])

//Controller for login.html
.controller('loginCtrl',function($scope, $location, $http, $ionicPopup, $ionicLoading, $window) {
  
  $scope.$on('$ionicView.enter', function() {
    if(navigator.onLine) {
      $scope.isOnline = true;
    }
    else{
      $scope.isOnline = false;
    } 
  });
    var screenWidth = $window.innerWidth;
    
    if (screenWidth < 700){
        $scope.isMobile = true;
    }else{
        $scope.isMobile = false;
    }

  var storageTestKey = 'sTest',
  storage = window.sessionStorage;

   $scope.showAlert = function(user) {
    // $localStorage.user = user;
    window.localStorage.setItem('user', user);
  
   // An alert dialog
   $scope.showAlert = function(user) {
     
     var password = user.password;
     var email = user.email;
     var data = { email: email, password: password};
     if (email && password){
       $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
  		
      var loginReq = {
       method: 'POST',
       url: 'https://auth.sqippr.com/login',
       data : data
      // transformR,equest: function(obj) {
      //   var str = [];
      //   for(var p in obj)
      //   str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      //   return str.join("&");
      //   },
    };
    // console.log(data);
      $http( loginReq).
          then(function(response) {
          // this callback will be called asynchronously
          // when the response is availa 
          console.log(response);
          var user = response.data;
         

          window.localStorage.setItem('data', response.data);
          window.localStorage.setItem('token', response.data.auth_token);
          window.localStorage.setItem('currentUserId', response.data.hasura_id);
          
          location.replace('index.html');
        },
         function(response) {
          console.log("Error");
          console.log(response);
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
       template: 'Invalid e-mail and password'
    });
     }
   
   };
  };
   
  // $scope.loginGmail = function() {
  //   window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?scope=email%20profile&response_type=token&client_id=885627976500-crfrti03r4pu40nh577s5oopp2nqhel0.apps.googleusercontent.com&redirect_uri=http://127.0.0.1:31999/project_3_hasura/www/index.html';
    
  // };
   
  // $scope.loginFacebook = function() {
     
  // };
   
   $scope.signUp = function() {
     location.replace('signUp.html');
   };
   
   $scope.forgotPass = function(){
       $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
  		     
     location.replace('forgotPass.html');
     
   };
   
})

.controller('forgotPassCtrl', function($scope, $http, $ionicLoading, $window){
  
  $scope.$on('$ionicView.enter', function() {
    if(navigator.onLine) {
      $scope.isOnline = true;
    }
    else{
      $scope.isOnline = false;
    } 
  });
  
  var screenWidth = $window.innerWidth;
    
    if (screenWidth < 700){
        $scope.isMobile = true;
    }else{
        $scope.isMobile = false;
    }
  $scope.sendPassMail = function(email){
     $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
    var forgotPassReq = {
      method: 'POST',
      url: 'https://auth.sqippr.com/password/forgot',
      data: {
        "email": email
      }
    };
    $http(forgotPassReq).then(function(response){
      console.log(response);
      location.replace('forgotPass2.html');
      
    }, function(response){
      $ionicLoading.hide();
      console.log(response);
      
    });
  };
})

.controller('forgotPass2Ctrl', function($scope, $ionicLoading, $window){
  
  $scope.$on('$ionicView.enter', function() {
    if(navigator.onLine) {
      $scope.isOnline = true;
    }
    else{
      $scope.isOnline = false;
    } 
  });
  
  var screenWidth = $window.innerWidth;
    
    if (screenWidth < 700){
        $scope.isMobile = true;
    }else{
        $scope.isMobile = false;
    }
  $scope.reset = function(email){
     $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
    location.replace('login.html');
  };
})

.controller('resetPasswordCtrl', function($scope, $http, $ionicPopup, $ionicLoading, $window){
  $scope.$on('$ionicView.enter', function() {
    if(navigator.onLine) {
      $scope.isOnline = true;
    }
    else{
      $scope.isOnline = false;
    } 
  });
  
  var screenWidth = $window.innerWidth;
    
    if (screenWidth < 700){
        $scope.isMobile = true;
    }else{
        $scope.isMobile = false;
    }
  
  $scope.resetPass = function(user){
    console.log(user);
    if(user.password === user.password2){
      $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
      
      var qs = (function(a) {
        if (a === "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i)
        {
            var p=a[i].split('=', 2);
            if (p.length == 1)
                b[p[0]] = "";
            else
                b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
      })(window.location.search.substr(1).split('&'));
      var token = qs['token'];
      console.log(token, 'awesome');
      
      var resetPassReq = {
        method: 'POST',
        url: 'https://auth.sqippr.com/password/reset',
        data: {
          "token": token,
          "password": user.password
        }
      };
      $http(resetPassReq).then(function(response){
        console.log(response);
        location.replace('forgotPass2.html');
        
      }, function(response){
        console.log(response);
        $ionicLoading.hide();
      });
      
    }
    else{
      var alertPopup = $ionicPopup.alert({
         title: 'Error!',
         template: 'Passwords do not match'
       });
    
       alertPopup.then(function(res) {
         console.log('passwords do not match');
       });
    }
    
  };
})

.controller('signUpCtrl', function($scope, $location, $http, $ionicPopup, $ionicLoading, $window, userDetails) {
  $scope.$on('$ionicView.enter', function() {
    if(navigator.onLine) {
      $scope.isOnline = true;
    }
    else{
      $scope.isOnline = false;
    } 
  });
  
  var screenWidth = $window.innerWidth;
    
    if (screenWidth < 700){
        $scope.isMobile = true;
    }else{
        $scope.isMobile = false;
    }

  var addUser = function(newUser, id){
      var addUserReq = {
            method: 'POST',
            url: 'https://server.sqippr.com/add_user',
            data: {
                'id': id,
                'name': newUser.username,
                'mobile' : newUser.mobile,
                'email' : newUser.email
            }
          };
          $http(addUserReq).then(function(response){
            location.href = 'signUp2.html';
              },
            function(response){
                console.log(response);
        });
  };
  
  $scope.showAlert = function(user) {
      $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
     var username = user.name;
     var mobile = user.mobile;
     var email = user.email;
     var password = user.password;
     
     if(user.password == user.passwordRetype){
       
      var data = { 
       'username': username,
       'email': email, 
       'mobile': mobile,
       'password': password
      };
  		
      var signUpReq = {
        method: 'POST',
        url: 'https://auth.sqippr.com/signup',
        data : data
      };
      console.log(data, parseInt(data.mobile));
      $http( signUpReq ).then(function(response) {
          // this callback will be called asynchronously
          // when the response is availa 
          console.log(response);
         
          window.localStorage.setItem('currentUserId', response.data.hasura_id);
          addUser(data, response.data.hasura_id);
        },
        function(response) {
          console.log("Error");
          console.log(response);
          var Popup = (response.data.message);
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
          title: 'Error!',
          template: Popup
          });
          
      });	

    }
    else {
      $ionicLoading.hide();
      var alertPopup = $ionicPopup.alert({
        title: 'Error!',
        template: 'Passwords do not match'
      });
    
      alertPopup.then(function(res) {
        console.log('passwords do not match');
      });
    }

  };
  
})

.controller('signedUpCtrl', function($scope, $window){
  $scope.$on('$ionicView.enter', function() {
    if(navigator.onLine) {
      $scope.isOnline = true;
    }
    else{
      $scope.isOnline = false;
    } 
  });
  
  var screenWidth = $window.innerWidth;
    
    if (screenWidth < 700){
        $scope.isMobile = true;
    }else{
        $scope.isMobile = false;
    }
  $scope.login = function(){
    location.replace('login.html');
  };
})

.controller('tabsCtrl', function($scope, $window, $ionicPopover){
  $scope.$on('$ionicView.enter', function() {
    if(navigator.onLine) {
      $scope.isOnline = true;
    }
    else{
      $scope.isOnline = false;
    } 
    
    var screenWidth = $window.innerWidth;
    
    if (screenWidth < 700){
        $scope.isMobile = true;
    }else{
        $scope.isMobile = false;
    }
  });
    
    $ionicPopover.fromTemplateUrl('templates/popover.html', {
      scope: $scope,
    }).then(function(popover) {
      $scope.popover = popover;
      console.log('working');
    });
    
    $scope.goToHome = function(){
      location.href = '#/tab/home';
    };
    
    $scope.goToAccount = function(){
      location.href = '#/tab/account';
    };
  
})

.controller('activateCtrl', function($scope, $location, $ionicPopup, $window, $http){

  $scope.$on('$ionicView.enter', function() {
    if(navigator.onLine) {
      $scope.isOnline = true;
    }
    else{
      $scope.isOnline = false;
    } 
  });
  
    var screenWidth = $window.innerWidth;
    
    if (screenWidth < 700){
        $scope.isMobile = true;
    }else{
        $scope.isMobile = false;
    }
  
  $scope.verify = function(regEmail, token){
    console.log(regEmail, token);
    var verifyReq = {
      method: 'POST',
      url: server + '1/table/account/select',
      data: {
        'columns': ['token'],
        'where': {'regEmail': regEmail}
      }
    };
    $http(verifyReq).then(function(response){
      console.log(response.data);
      if(response.data[0].token == token){
        
      var alertPopup = $ionicPopup.alert({
        title: '',
        template: 'Verification successful!'
      });
          
      alertPopup.then(function(res) {
        
          var updateStatusReq = {
            method: 'POST',
            url: server + '1/table/account/update',
            data: {
              "$set":{"isActive": true},
              "where": {"token": $scope.token}
            }
          };
          $http(updateStatusReq).then(function(response){
            location.replace('login.html');
            
          }, function(response){
            console.log(response);
          });
        });
      }
      else{
          var alert4Popup = $ionicPopup.alert({
            title: 'Error!',
            template: 'Invalid token! Please check and try again'
          });
              
          alert4Popup.then(function(res) {
          });        
      }
      },
      function(response){
        console.log(response);
        var alert3Popup = $ionicPopup.alert({
          title: 'Error!',
          template: 'Invalid token! Please check and try again'
        });
            
        alert3Popup.then(function(res) {
        });
    });
  };
})
//Controller for home tab
.controller('HomeCtrl', function($scope, $http, outlets, $window, userDetails, $location, $ionicPopup, $ionicPopover, cart) {
        
  console.log(window.localStorage['token']);
  console.log(window.localStorage['currentUserId']);
  
  $scope.$on('$ionicView.enter', function() {
    if(navigator.onLine) {
      $scope.isOnline = true;
    }
    else{
      $scope.isOnline = false;
    } 

    var screenWidth = $window.innerWidth;
    
    if (screenWidth < 700){
        $scope.isMobile = true;
    }else{
        $scope.isMobile = false;
    }
  });
  
  
  

  $scope.images = [{"url": "img/1.jpg"}, {"url": "img/2.jpg"}];
  $scope.current = 0;
  
  // var userReq = {
  //           method: 'POST',
  //           url: server + '1/table/users/select',
  //           data: {
  //             'columns': ['*'],
  //             'where': {'id': parseInt(window.localStorage['currentUserId'])}
  //           },
  //           headers: {
  //             'Authorization': 'Hasura ' + window.localStorage['token']
  //           }
  //         };
  //         $http(userReq).then(function(response){
  //           console.log(response.data);
  //           userDetails.addUser(response.data[0]);
  //           $scope.user = userDetails.getUser();
  //       },
  //         function(response){
  //           console.log(response);
  //   });
  
  var outletsReq = {
      method: 'POST',
      url: server + '1/table/outlets/select',
      data: {
        "columns": ["*"]
      }
    };
    $http(outletsReq).then(function(response){
          console.log(response.data);
          $scope.$evalAsync(function(){
            $scope.outletsList = response.data;  
          });
        },
      function(response){
          console.log(response);
        });
    
    $scope.openOutlet = function(object) {
        
      if(object.key == 'noAuth'){
        outlets.addOutlet(object); 
        location.href = "#/tab/resto";  
      }
        else{
          
            outlets.addOutlet(object); 
            // var accountPopup = $ionicPopup.show({
            //   templateUrl : 'templates/accountPopup.html',
            //   title:'Please choose your account:',
            //   scope: $scope,
            //   buttons: [
            //     { text: 'Cancel',
            //       onTap: function(e) {
            //         var check = 0;
            //         return {
            //           check: check
            //         };
            //       }
            //     },
            //     {
            //       text: '<b>OK</b>',
            //       type: 'button-assertive',
            //       onTap: function(e) {
            //         var check = 1;
            //         return {
            //           check: check
            //         };
            //       }
            //     },
            //   ]
            // });
             
            // accountPopup.then(function(res) {
            // });
    if(window.localStorage['token'] === '' || window.localStorage['token'] === undefined){
            var accountPopup = $ionicPopup.show({
              template : '<p> You are not authorized to access this! Please log in</p>',
              title:'Unauthorized!',
              scope: $scope,
              buttons: [
                { text: 'Cancel',
                  onTap: function(e) {
                    var check = 0;
                    return {
                      check: check
                    };
                  }
                },
                {
                  text: '<b>OK</b>',
                  type: 'button-assertive',
                  onTap: function(e) {
                    var check = 1;
                    return {
                      check: check
                    };
                  }
                },
              ]
            });
             
            accountPopup.then(function(res) {
            });      
    }
    else{
      var accountsReq = {
              method: 'POST',
              url: server+'1/table/account/select',
              data: {
               "columns": ["*"],
               "where": {"userId": parseInt(window.localStorage['currentUserId'])}
              },
              headers: {
                'Authorization': 'Hasura ' + window.localStorage['token']
              }
            };
            $http(accountsReq).then(function(response){
              console.log(response.data, object);
              if(response.data.length === 0){
                var accountPopup9 = $ionicPopup.show({
                  template : '<p> Please add your smail account in the profile section</p>',
                  title:'Unauthorized!',
                  scope: $scope,
                  buttons: [
                    { text: 'Cancel',
                      onTap: function(e) {
                        var check = 0;
                        return {
                          check: check
                        };
                      }
                    },
                    {
                      text: '<b>OK</b>',
                      type: 'button-assertive',
                      onTap: function(e) {
                        var check = 1;
                        return {
                          check: check
                        };
                      }
                    },
                  ]
                });
                 
                accountPopup9.then(function(res) {
                });                 
              }
              else{
                  var i=0, check=0;
                  for(i=0; i<response.data.length; i++){
                    if(response.data[i].authKey === object.key){
                      check = 1;
                      if(response.data[i].isActive === true){
                        check = 2;
                      }
                    }
                  }
                  
                  if(check === 2){
                    location.href = "#/tab/resto";
                  }
                  else if(check === 1){
                    var accountPopup = $ionicPopup.show({
                      template : '<p> You have not verified your institute account yet! Please check your institute mail</p>',
                      title:'Unauthorized!',
                      scope: $scope,
                      buttons: [
                        { text: 'Cancel',
                          onTap: function(e) {
                            var check = 0;
                            return {
                              check: check
                            };
                          }
                        },
                        {
                          text: '<b>OK</b>',
                          type: 'button-assertive',
                          onTap: function(e) {
                            var check = 1;
                            return {
                              check: check
                            };
                          }
                        },
                      ]
                    });
                     
                    accountPopup.then(function(res) {
                    });                
                  }
                  // $scope.accounts = [];
                  // if(response.data.length !== 0){
                  //   $scope.check = true;
                  //   for(i=0; i<response.data.length; i++){
                  //       $scope.accounts[i] = {};
                  //       $scope.accounts[i].regEmail = response.data[i].regEmail;
                  //       $scope.accounts[i].id = response.data[i].id;
                  //       $scope.accounts[i].isChosen = false;
                  //     }
        
                  //   $scope.noOfAccounts = response.data.length;              
                  // }
                  // else{
                  //   $scope.check = false;
                  // }  
              }
            
  
          },
            function(response){
              console.log(response);
      });  
      
  //   $scope.choose = function(account){
  //     var object = outlets.getOutlet();
  //     console.log(account, object);
  //                 var isActiveAccountReq = {
  //                     method: 'POST',
  //                     url: server+'1/table/account/select',
  //                     data: {
  //                     "columns": ["isActive", "authKey"],
  //                     "where": {
  //                         "id": parseInt(account.id)
  //                     }
  //                     },
  //                     headers: {
  //                         'Authorization': 'Hasura ' + window.localStorage['token']
  //                       }
  //                   };
  //                   $http(isActiveAccountReq).then(function(response){
  //                     var check = 0;
  //                     console.log(response);
                      
  //                     if(response.data.length !== 0){
  //                       if(response.data[0].isActive === true){
                          
  //                           if(response.data[0].authKey == object.key){
  //                             console.log('success');
  //                             outlets.addOutlet(object); 
  //                             location.href = "#/tab/resto";  
  //                           }
  //                           else{
  //                                 var alert3Popup = $ionicPopup.alert({
  //                                     title: 'Unauthorized!',
  //                                     template: 'You are not authorized to access this outlet\'s details'
  //                                   });
                                  
  //                                   alert3Popup.then(function(res) {
  //                                     location.replace('index.html');
  //                                   });
  //                           }                         
  //                       }
  //                       else{
  //                         var alertPopup = $ionicPopup.alert({
  //                               title: 'Unauthorized!',
  //                               template: 'You have not activated your account yet. Please check your smail and follow the activation link'
  //                             });
                            
  //                             alertPopup.then(function(res) {
  //                               location.replace('index.html');
  //                             });
  //                       }
  //                     }
  
  //                 },
  //                   function(response){
  //                     console.log(response);
  //                         var alert2Popup = $ionicPopup.alert({
  //                               title: 'Unauthorized!',
  //                               template: 'You have not activated your account yet. Please check your smail and follow the activation link'
  //                             });
                            
  //                             alert2Popup.then(function(res) {
  //                               location.replace('index.html');
  //                             });
  //                 });
    
  // };                
      
    }
            }
          };
          
          $scope.imagesOutlets = [{
            "url":"3.jpg"
          },{
            "url":"4.jpg"
          }];
          
        $scope.details = [{
            "title": "About Us",
            "text":"We are an IIT Madras students’ initiative to change the way you order and have food!Specifically designed to make dining ...",
            "isMobile": true,
            "isWeb": true,
           }];
          $scope.dummy = [{"objects":[1]}];
        $scope.toggleDetail = function(group) {
          group.show = !group.show;
        };
        $scope.isDetailShown = function(group) {
          return group.show;
        };
      
})
      
      //controller to load menu
.controller("RestoDetailsCtrl", ['$scope', 'orders', 'favourites', 'cart', 'outlets', '$http', 'userDetails', '$ionicPopup', '$window', '$timeout', '$location', '$ionicScrollDelegate',
      
  function ($scope, orders,favourites, cart, outlets, $http, userDetails, $ionicPopup, $window, $timeout, $location, $ionicScrollDelegate) {
          
  $scope.$on('$ionicView.enter', function() {
    if(navigator.onLine) {
      $scope.isOnline = true;
    }
    else{
      $scope.isOnline = false;
    } 
    
    var screenWidth = $window.innerWidth;
    
    if (screenWidth < 700){
        $scope.isMobile = true;
    }else{
        $scope.isMobile = false;
    }
    
          $scope.currentOutlet = outlets.getOutlet();
           $scope.isEmpty = false;
            if(Object.keys($scope.currentOutlet).length === 0){
               $scope.isEmpty =  true;
             }
    funcMenu();
  });

  $scope.return = function(){
    location.replace('index.html');
  };
  
  $scope.scrollTo = function(target){
    $location.hash(target);   //set the location hash
    var handle = $ionicScrollDelegate.$getByHandle('myPageDelegate');
    handle.anchorScroll(true);  // 'true' for animation
    $ionicScrollDelegate.resize();
  };
  
    $scope.scrollToTop = function(){
      $ionicScrollDelegate.scrollTop();
    };
           $scope.user = userDetails.getUser();
           $scope.currentOutlet = outlets.getOutlet();
           
           
           $scope.details = [{
             "objects":[1]
           }];
        
        var funcMenu = function(){
          console.log('works');
          var menuReq = {
                  method: 'POST',
                  url: server + '1/table/items/select',
                  data: {
                    "columns": ["*"],
                    "where": {"outletId": $scope.currentOutlet.id}
            }
          };
          $http(menuReq).then(function(response){
              var i, j, unsortedMenu = response.data;
              if(window.localStorage['currentUserId'] !== null || window.localStorage['currentUserId'] !== undefined){
                var favReq = {
                  method:"POST",
                  url: server + "1/table/favourites/select",
                  data: {
                    "columns": ["*"],
                    "where": {
                      "userId": parseInt(window.localStorage['currentUserId'])
                    }
                  },
                  headers: {
                    'Authorization': 'Hasura ' + window.localStorage['token']
                  }
                };
                $http(favReq).then(function(response){
                  favourites.addCurrentFav(response.data);
                }, function(response){
                  console.log(response);
                });
              }
              
              $scope.groups = [];
              
              for( i=0; i<unsortedMenu.length; i++) {
                  $scope.groups[i] = {};
                  $scope.groups[i].type = unsortedMenu[i].type;
                  $scope.groups[i].id = i;
              }
          
              for( i=0; $scope.groups[i]!==undefined; i++){
                for( j=0; $scope.groups[j]!=undefined; j++){
                    if(i!==j){
                      if($scope.groups[j].type == $scope.groups[i].type){
                        $scope.groups.splice(j, 1);
                      }
                    }
                }
              }
              for( i=0; $scope.groups[i]!==undefined; i++){
                for( j=0; $scope.groups[j]!=undefined; j++){
                    if(i!==j){
                      if($scope.groups[j].type == $scope.groups[i].type){
                        $scope.groups.splice(j, 1);
                      }
                    }
                }
              }
              console.log($scope.groups);
  
              
              var fav = favourites.getCurrentFav();
              var k;
              for( i=0; i<$scope.groups.length; i++){
                $scope.groups[i].items = [];
                for(j=0; j<unsortedMenu.length; j++){
                  if( $scope.groups[i].type == unsortedMenu[j].type){
                    for(k=0; k<fav.length; k++){
                      if(fav[k].itemId === unsortedMenu[j].id){
                        unsortedMenu[j].isFavourite = true;
                        break;
                      } 
                      else{
                        unsortedMenu[j].isFavourite = false;
                      }
                    }
                    $scope.groups[i].items.push(unsortedMenu[j]); 
                  }
                }
              
              }
            },
          function(response){
              console.log(response);
            });
        };
            
        $scope.addToFavourites = function(check, newFavouriteItem) {
          
          if(check === true){
            favourites.addToFavourites(newFavouriteItem);
          }
          else {
            favourites.removeFavourites(newFavouriteItem);
          }
        };
        
        $scope.addToCart = function(item) {
          if(orders.getProgress() === true){
              var alertCart = $ionicPopup.alert({
                title: 'Error!',
                template: 'Your order is already in progress. Please wait till it gets confirmed to order again.'
              });
                      
              alertCart.then(function(res) {
              });            
          }
          else{
              document.getElementById('alert').style.display = 'block';
              $timeout(function(){
                document.getElementById('alert').style.display = 'none';
              }, 2000);
            $scope.currentOutlet = outlets.getOutlet();
            console.log($scope.currentOutlet);
            outlets.addminTimes($scope.currentOutlet.minPrepTime);
            var count = cart.addToCart(item, $scope.currentOutlet.id);
            
            $scope.$evalAsync(function(){
              $scope.itemsNo = count;
              console.log($scope.itemsNo);
            });
            if(count == 1){
              // var alertCart = $ionicPopup.alert({
              //   title: 'Item has been added to cart!',
              //   template: 'You can continue to add items or checkout by clicking the cart icon in the bottom tab bar'
              // });
                      
              // alertCart.then(function(res) {
              // });
              
            }  
          }
          // console.log('item sent to cart');
        };
        
        $scope.removeFromCart = function(item) {
          $scope.currentOutlet = outlets.getOutlet();
          cart.removeFromCart(item, $scope.currentOutlet.id);
          console.log('item sent to remove from cart');
        };
        
        $scope.deleteFromCart = function(item) {
          cart.deleteFromCart(item);
        };
        
        $scope.toggleGroup = function(group) {
          group.show = !group.show;
        };
        $scope.isGroupShown = function(group) {
          return group.show;
        };
        
        $scope.toggleDetail = function(group) {
          group.show = !group.show;
        };
        $scope.isDetailShown = function(group) {
          return group.show;
        };
      
  $scope.navigatePart = function(id){
    location.href ='http://127.0.0.1:31999/project_3_hasura/www/index.html#/tab/resto#'+id; 
  };
        

}])

.controller('AccountCtrl', function($scope, $ionicPopup, $http, $window, userDetails) {
  
  $scope.$on('$ionicView.enter', function() {
    if(navigator.onLine) {
      $scope.isOnline = true;
    }
    else{
      $scope.isOnline = false;
    } 
    console.log($scope.isOnline);
    var screenWidth = $window.innerWidth;
    
    if (screenWidth < 700){
        $scope.isMobile = true;
    }else{
        $scope.isMobile = false;
    }
  });
    $scope.user = userDetails.getUser();
    
    console.log(window.localStorage['currentUserId']);
    $scope.returnToken = function() {
      var check, token = window.localStorage['token'];
      if(token !== undefined){
        if(token.length === 0){
          check = false;
        } 
        else {
          check = true;
        }
      }
      // console.log(check, token);
      return check;
    };
  
  
  $scope.leftButtons = [{
    type: 'button-icon icon ion-navicon',
    tap: function(e) {
      console.log('Going back!');
    }
  }];
  

    $scope.showConfirm = function() {
      
      // var confirmPopup = $ionicPopup.confirm({
      //   title: 'Consume Ice Cream',
      //   template: 'Are you sure you want to eat this ice cream?'
      // });
       
      // confirmPopup.then(function(res) {
      //   if(res) {
      //     console.log('You are sure');
      //   } else {
      //     console.log('You are not sure');
      //   }
      // });
    };
    
    $scope.showConfirm = function() {
      
      var confirmPopup = $ionicPopup.confirm({
          title: 'Delete Account',
          template: 'Are you sure you want to delete your account?'
        });
      
        confirmPopup.then(function(res) {
          if(res) {
            $scope.showPopup();
            console.log('You are sure');
          } else {
            console.log('You are not sure');
          }
        });
    };
    
    $scope.deleteAccount = { password: 'password'};   
    
    $scope.showPopup = function() {
       $scope.data = {};
    
       // An elaborate, custom popup
       var myPopup = $ionicPopup.show({
         templateUrl : 'templates/popUp.html',
         title:'Re-enter your password',
         scope: $scope,
         buttons: [
           { text: 'Cancel',
             onTap: function(e) {
               var check = 0;
              // alert($scope.deleteAccount.password);
               return {
                 check: check
               };
             }
           },
           {
             text: '<b>Delete</b>',
             type: 'button-assertive',
             onTap: function(e) {
               var check = 1;
              // alert($scope.deleteAccount.password);
               return {
                 check: check,
                 password: $scope.deleteAccount.password
               };
             }
           },
         ]
       });
       
       myPopup.then(function(res) {
           if( res.check === 0){
             console.log('okay will not delete');
           }
           else if (res.check === 1 ){
            console.log(res.check, res.password);
              var deleteAccountReq = {
                
              method: 'POST',
              url: 'https://auth.sqippr.com/user/account/delete',
              data: {
              "password": res.password
              },
              headers: {
                'Authorization': 'Hasura ' + window.localStorage['token']
              }
            };
                    
            $http(deleteAccountReq).then(function(response){
                console.log(response); 
                window.localStorage('token','');
                window.localStorage.setItem('currentUser', '');
                window.localStorage.setItem('currentUserId', '');
              },
                function(response){
                console.log(response);
            });
          }
       });
      };
      
    $scope.logout = function() {
      
      var confirmPopup = $ionicPopup.confirm({
          title: 'Logout',
          template: 'Are you sure you want to logout?'
        });
      
        confirmPopup.then(function(res) {
          if(res) {
            var logoutReq = {
              method: 'GET',
              url: 'https://auth.sqippr.com/user/logout',
              headers: {
                'Authorization': 'Hasura ' + window.localStorage['token']
              }
            };
            $http(logoutReq).then(function(response){
                console.log(response); 
                window.localStorage.setItem('token', '');
                window.localStorage.setItem('currentUser', '');
                window.localStorage.setItem('currentUserId', '');
                location.replace('index.html');
          },
            function(response){
                console.log(response);
              });
          } else {
            console.log('not logged out');
          }
        });
      };

})

.controller('CartCtrl', [ '$scope', 'cart', '$http', '$window', '$ionicPopup', '$location', 'orders', 'userDetails', 'outlets',
  
  function($scope, cart, $http, $window, $ionicPopup, $location, orders, userDetails, outlets) {
    
    // if(window.localStorage['token'] === '' | window.localStorage['token'] === undefined){
    //   location.replace('login.html');
    // }
  $scope.$on('$ionicView.enter', function() {
    if(navigator.onLine) {
      $scope.isOnline = true;
    }
    else{
      $scope.isOnline = false;
    } 
    
    var screenWidth = $window.innerWidth;
    
    if (screenWidth < 700){
        $scope.isMobile = true;
    }else{
        $scope.isMobile = false;
    }

    
      $scope.placeOrder = function(cartList, paymentMethod, isParcel, isDelivery, takeAwayHour, takeAwayMinute, address, isImmediate, customize_order) {

        console.log('order placing');
        console.log(cartList);
        $scope.orderedOutlets = [];
        var i,j;
          
          for( i=0; i<cartList.length; i++) {
              $scope.orderedOutlets[i] = {};
              $scope.orderedOutlets[i].outletId = cartList[i].outletId;
          }
          console.log($scope.orderedOutlets);
          
          for( i=0; i< $scope.orderedOutlets.length; i++){
            for( j=0; j< $scope.orderedOutlets.length; j++){
              if($scope.orderedOutlets[i].outletId == $scope.orderedOutlets[j].outletId && i!=j){
                $scope.orderedOutlets.splice(j, 1);
              }
            }
          }
          console.log($scope.orderedOutlets);
          
          for( i=0; i<$scope.orderedOutlets.length; i++){
            $scope.orderedOutlets[i].items = [];
            for(j=0; j<cartList.length; j++){
              if( $scope.orderedOutlets[i].outletId == cartList[j].outletId){
                $scope.orderedOutlets[i].items.push(cartList[j]);
              }
            }
          }
          console.log($scope.orderedOutlets);
          
          for( i=0; i< $scope.orderedOutlets.length; i++){
            $scope.orderedOutlets[i].billAmount = 0;
            for(j=0; j<$scope.orderedOutlets[i].items.length; j++){
              $scope.orderedOutlets[i].billAmount += $scope.orderedOutlets[i].items[j].price*$scope.orderedOutlets[i].items[j].quantity;
            }
          }
          console.log($scope.orderedOutlets);
          var timestamp = new Date();
          
          orders.addTimeStamp(timestamp);
          console.log(timestamp);
          for(i=0; i<$scope.orderedOutlets.length; i++){
            console.log('called');
            $scope.separatedList(customize_order, $scope.orderedOutlets[i], paymentMethod, isParcel, isDelivery, takeAwayHour, takeAwayMinute, address, timestamp, isImmediate);
          }
    };
    
    $scope.separatedList = function(customize_order, cartList, paymentMethod, isParcel, isDelivery, takeAwayHour, takeAwayMinute, address, timestamp, isImmediate){
      console.log(cartList.items);
      
          var orderReq = {
            method: 'POST',
            url: server + '1/table/orders/insert',
            data: {
              "objects": [{
                'userId': parseInt(window.localStorage['currentUserId']),
                'totalAmount': cartList.billAmount,
                'billAmount': cartList.billAmount,
                'status':'pending',
                'paymentMethod': paymentMethod,
                'isDelivery': isDelivery,
                'isParcel': isParcel,
                'takeAwayHour': takeAwayHour,
                'takeAwayMinute': takeAwayMinute,
                'deliveryAddress': address,
                'outletId': parseInt(cartList.outletId),
                'timestamp': timestamp,
                'token': '',
                'packing_charge': 0,
                'delivery_charge': 0,
                'conv_charge': 0,
                'payment_status': 'not paid',
                'isImmediate': isImmediate,
                'cancel_reason':'',
                'print_status': false,
                'takeAway_timestamp': cart.getTimestamp(),
                'customize_order': customize_order
              }],
              "returning" : ["id"]
            },
            headers: {
              'Authorization': 'Hasura ' + window.localStorage['token']
            }
          };
        $http(orderReq).then(function(response){
            console.log(response); 
            console.log('order placed');
            cart.addCurrentOrder(response.data.returning[0].id);
            $scope.addItems(response.data.returning[0].id, cartList.items, paymentMethod, timestamp);
            
                  var getToken = function() {
                    var text = "";
                    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                    for(var i = 0; i < 6; i++) {
                        text += possible.charAt(Math.floor(Math.random() * possible.length));
                    }
                    return text;
                  };
                  var updateTokenReq = {
                      method: 'POST',
                      url: server + '1/table/orders/update',
                      data: {
                        "$set":{"token": response.data.returning[0].id+'#'+getToken()},
                        "where": {"id": response.data.returning[0].id}
                      },
                      headers: {
                        'Authorization': 'Hasura ' + window.localStorage['token']
                      }
                    };
                  
                  $http(updateTokenReq).then(function(response){
                      console.log(response); 
                    },
                    function(response){
                        console.log(response);
                  });

            },
          function(response){
              console.log(response);
        });
        };
            
        $scope.addItems = function(currentOrderId, cartListItems, paymentMethod, timestamp){
                    var insertCart = [], i, j;
                    
                    
                    for( i=0; i< cartListItems.length; i++){
                      var dummyCartItem = {};
                      
                      dummyCartItem.orderId = parseInt(currentOrderId);
                      dummyCartItem.userId = parseInt(window.localStorage['currentUserId']);
                      dummyCartItem.itemId = parseInt(cartListItems[i].id);
                      dummyCartItem.outletId = parseInt(cartListItems[i].outletId);
                      dummyCartItem.quantity = parseInt(cartListItems[i].quantity);
                      dummyCartItem.timestamp = timestamp;
                      dummyCartItem.isAvailable = true;
                      insertCart.push(dummyCartItem);
                    }
                    
                    console.log(insertCart);
                    
                    //split cartlist such that it is usable by orderedItemsReq
                    var orderedItemsReq = {
                      method: 'POST',
                      url: server + '1/table/orderedItems/insert',
                      data: {
                        "objects": insertCart
                      },
                      headers: {
                        'Authorization': 'Hasura ' + window.localStorage['token']
                      }
                    };
                  
                  $http(orderedItemsReq).then(function(response){
                      console.log(response); 
                       location.href ='#/tab/awaitingConfirmation'; 
                    },
                    function(response){
                        console.log(response);
                      });
            };   
    
    $scope.cartList = cart.cartList;
    
    var totalAmount;
    $scope.getTotal = function() {
      var i, total=0;
      for( i=0; i<$scope.cartList.length; i++) {
        total += $scope.cartList[i].price*$scope.cartList[i].quantity;
      }
      totalAmount = total;
      return total;
    };
    
    $scope.isCartEmpty = function (){
      if( $scope.cartList.length ===0 ){
        return true;
      }
      else {
        return false;
      }
    };
    
    var getPadded = function(val){
      return val < 10 ? ('0' + val) : val;
    };
    
    var timeFormat = function(val){
      return val > 12 ? ( val-12 ): val; 
    };
    
    $scope.getMinTime = function(cartList) {
      var i, check=0, largest = 60, minTime = 0;

      var minTimes = outlets.getminTimes();
      
      for(i=0; i<minTimes.length; i++){
        if(largest > minTimes[i]){
          largest = minTimes[i];
        }
      }
      
      for(i=0; i<cartList.length; i++){
        if(cartList[i].minTime !==0){
          check = 1;
          break;
        }
      }
      if(check == 1){
        minTime = largest;
      }
      else {
        minTime = 0;
      }
      
      var currentTime = new Date();
      $scope.currentHour = currentTime.getHours();
      $scope.currentMinutes = currentTime.getMinutes();
      
      if( (minTime+$scope.currentMinutes) >= 60){
        $scope.minHour = $scope.currentHour + 1;
        $scope.minMinutes = minTime+$scope.currentMinutes-60;
      }
      else {
        $scope.minHour = $scope.currentHour;
        $scope.minMinutes = minTime + $scope.currentMinutes;
      }
      
      cart.addMinTime(minTime);
      cart.addMinMinutes($scope.minMinutes);
      cart.addMinHour($scope.minHour);
      
      return timeFormat(($scope.minHour))+':'+ getPadded($scope.minMinutes);
      
    };
    

    $scope.delivery = function(cartList, customize_order) {
      $scope.choice = '';
      
       var deliveryPopup = $ionicPopup.show({
         templateUrl : 'templates/deliveryPopup.html',
         title:'Please select payment method :',
         scope: $scope,
         buttons: [
           { text: 'Cancel',
             onTap: function(e) {
               var check = 0;
              // alert($scope.deleteAccount.password);
               return {
                 check: check
               };
             }
           },
           {
             text: '<b>OK</b>',
             type: 'button-assertive',
             onTap: function(e) {
               var check = 1;
               choice = $scope.choice;
               console.log(choice);
              // alert($scope.deleteAccount.password);
               return {
                 check: check,
                 choice: $scope.choice
               };
             }
           },
         ]
       });
       
       deliveryPopup.then(function(res) {

           if( res.check === 0){
             console.log('payment canceled');
           }
           else if (res.check === 1 ){
             
            var deliveryAddressPopup = $ionicPopup.show({
               templateUrl : 'templates/deliveryAddressPopup.html',
               title:'Please enter your delivery address :',
               scope: $scope,
               buttons: [
                 { text: 'Cancel',
                   onTap: function(e) {
                     var check = 0;
                    // alert($scope.deleteAccount.password);
                     return {
                       check: check
                     };
                   }
                 },
                 {
                   text: '<b>OK</b>',
                   type: 'button-assertive',
                   onTap: function(e) {
                     var check = 1;
                     console.log(choice);
                    // alert($scope.deleteAccount.password);
                     return {
                       check: check
                     };
                   }
                 },
               ]
             });
             
             deliveryAddressPopup.then(function(res){
               if(res.check ===0 ){
                 console.log('no address');
               }
               else if(res.check === 1){
                var choice = cart.getChoice();
                var address = cart.getAddress();
                
                if(choice=== ''){
                   var alertChoice = $ionicPopup.alert({
                        title: 'Invalid Choice!',
                        template: 'Please choose a valid choice'
                      });
                    
                      alertChoice.then(function(res) {
                        // console.log('Thank you for not eating my delicious ice cream cone');
                      });
                }
              else{
                if(address === ''){
                     var alertAddressPopup = $ionicPopup.alert({
                       title: 'Invalid Address!',
                       template: 'Please enter a valid address'
                     });
                  
                     alertAddressPopup.then(function(res) {
                      console.log('empty address');
                     });                  
                }
                else{
                
                if( choice == 'onlinePayment'){
                    $scope.placeOrder( cartList, choice, true, true, 0, 0, address, false, customize_order);
                  }
                  else if( choice == 'cashOnDelivery'){
                      $scope.placeOrder( cartList, choice, true, true, 0, 0, address, false, customize_order);
                  }
                }
              }
               }
               
             });
          }
      });
    };
    
    $scope.takeAway = function(cartList, customize_order) {
      
      $scope.choice = '';
      var takeAwayPopup = $ionicPopup.show({
         templateUrl : 'templates/takeAwayPopup.html',
         title:'Please select your take-away mode :',
         scope: $scope,
         buttons: [
           { text: 'Cancel',
             onTap: function(e) {
               var check = 0;
              // alert($scope.deleteAccount.password);
               return {
                 check: check
               };
             }
           },
           {
             text: '<b>OK</b>',
             type: 'button-assertive',
             onTap: function(e) {
               var check = 1;
              // alert($scope.deleteAccount.password);
               return {
                 check: check
               };
             }
           },
         ]
       });

       takeAwayPopup.then(function(res) {
         
           if( res.check === 0){
             console.log('payment canceled');
           }
           else if (res.check === 1 ){
            
             var takeAwayTimePopup = $ionicPopup.show({
               templateUrl : 'templates/takeAwayTimePopup.html',
               title:'Please enter take-away time :',
               scope: $scope,
               buttons: [
                 { text: 'Cancel',
                   onTap: function(e) {
                     var check = 0;
                    // alert($scope.deleteAccount.password);
                     return {
                       check: check
                     };
                   }
                 },
                 {
                   text: '<b>OK</b>',
                   type: 'button-assertive',
                   onTap: function(e) {
                     var check = 1;
                     return {
                       check: check
                     };
                   }
                 },
               ]
             });       
             
             takeAwayTimePopup.then(function(res) {
                
                var takeAwayHour = cart.getHour();
                var takeAwayMinute = cart.getMinute();
                var choice = cart.getChoice();
                var minHour = cart.getMinHour();
                var minMinute = cart.getMinMinutes();
                
                if(choice === ''){
                      var alertChoice = $ionicPopup.alert({
                        title: 'Invalid Choice!',
                        template: 'Please choose a valid choice'
                      });
                    
                      alertChoice.then(function(res) {
                        // console.log('Thank you for not eating my delicious ice cream cone');
                      });
                }
                else{
                  if( res.check === 0){
                    console.log('payment canceled');
                  }
                  else if (res.check === 1 ){
                    
                    if( ((takeAwayHour - minHour)<3) && ((takeAwayHour - minHour)>0) ){
                      if( choice == 'dineIn'){
                        console.log('being placed');
                        // $scope.checkfn();
                          $scope.placeOrder( cartList, 'onlinePayment', false, false, takeAwayHour, takeAwayMinute, '', false, customize_order);
                        }
                        else if( choice == 'parcel'){
                          console.log('being placed');
                          // $scope.checkfn();
                          $scope.placeOrder( cartList, 'onlinePayment', true, false, takeAwayHour, takeAwayMinute, '', false, customize_order);
                        }
                    }
                    else if( takeAwayHour == minHour){
                      if( takeAwayMinute >= minMinute){
                        if( choice == 'dineIn'){
                          console.log('being placed');
                          // $scope.checkfn();
                            $scope.placeOrder( cartList, 'onlinePayment', false, false, takeAwayHour, takeAwayMinute, '', false, customize_order);
                          }
                          else if( choice == 'parcel'){
                            console.log('being placed');
                            // $scope.checkfn();
                            $scope.placeOrder( cartList, 'onlinePayment', true, false, takeAwayHour, takeAwayMinute, '', false, customize_order);
                          }
                      }
                    }
                    else {
                      var alertPopup = $ionicPopup.alert({
                        title: 'Invalid Time!',
                        template: 'Order can only be placed within 3 hours of estimated take away time'
                      });
                    
                      alertPopup.then(function(res) {
                        // console.log('Thank you for not eating my delicious ice cream cone');
                      });
                    }
                      console.log('order can be placed');
                  }  
                }
         
              });

          }
      
      });
    };
    $scope.immediateOrder = function(cartList, customize_order) {
      
      $scope.choice = '';
      var takeAwayPopup = $ionicPopup.show({
         templateUrl : 'templates/takeAwayPopup.html',
         title:'Please select your dining mode :',
         scope: $scope,
         buttons: [
           { text: 'Cancel',
             onTap: function(e) {
               var check = 0;
              // alert($scope.deleteAccount.password);
               return {
                 check: check
               };
             }
           },
           {
             text: '<b>OK</b>',
             type: 'button-assertive',
             onTap: function(e) {
               var check = 1;
              // alert($scope.deleteAccount.password);
               return {
                 check: check
               };
             }
           },
         ]
       });

       takeAwayPopup.then(function(res) {
         var choice = cart.getChoice();
         var takeAwayHour = 0;
         var takeAwayMinute = 0;
         
        if(choice === ''){
                      var alertChoice = $ionicPopup.alert({
                        title: 'Invalid Choice!',
                        template: 'Please choose a valid choice'
                      });
                    
                      alertChoice.then(function(res) {
                        // console.log('Thank you for not eating my delicious ice cream cone');
                      });
        }
        else{
          if( res.check === 0){
             console.log('payment canceled');
           }
           else if (res.check === 1 ){
                  
                      if( choice == 'dineIn'){
                        console.log('being placed');
                        // $scope.checkfn();
                          $scope.placeOrder( cartList, 'onlinePayment', false, false, takeAwayHour, takeAwayMinute, '', true, customize_order);
                        }
                        else if( choice == 'parcel'){
                          console.log('being placed');
                          // $scope.checkfn();
                          $scope.placeOrder( cartList, 'onlinePayment', true, false, takeAwayHour, takeAwayMinute, '', true, customize_order);
                        }
          }
        }
      
      });
    };
  });
  
}])

.controller('FavouritesCtrl', [ '$scope', 'favourites', '$http', 'outlets', 'cart', '$ionicPopup', '$interval', '$rootScope', '$window', 
  
  function($scope, favourites, $http, outlets, cart, $ionicPopup, $interval, $rootScope, $window) {
    
    // if(window.localStorage['token'] === '' | window.localStorage['token'] === undefined){
    //   location.replace('login.html');
    // }
    $scope.$on('$ionicView.enter', function() {
    if(navigator.onLine) {
      $scope.isOnline = true;
    }
    else{
      $scope.isOnline = false;
    } 
    
    var screenWidth = $window.innerWidth;
    
    if (screenWidth < 700){
        $scope.isMobile = true;
    }else{
        $scope.isMobile = false;
    }

      var favouritesfn = function(){
        var favouritesReq = {
          method: 'POST',
          url: server + '1/table/favourites/select',
          data: {
            "columns":["*", {
              "name": "item",
              "columns" : ["*"]
            }],
            "where": { "userId": parseInt(window.localStorage['currentUserId'])}
          },
            headers: {
              'Authorization': 'Hasura ' + window.localStorage['token']
          }
        };
                    
        $http(favouritesReq).then(function(response){
          // console.log(response); 
          $scope.$evalAsync(function(){
            $scope.favList = response.data;
            $scope.favourites_length = response.data.length;
          });
          
        }, function(response){
            console.log(response);
        });
      };
      
      $scope.stop = $interval(favouritesfn, 1000);
  
      var dereg = $rootScope.$on('$locationChangeSuccess', function() {
        $interval.cancel($scope.stop);
        dereg();
      });
    });


    $scope.removeFromFav = function(id){
      var removeFromFavReq = {
        method: 'POST',
        url: server + '1/table/favourites/delete',
        data: {
          "where": {"id": id}
        },
        headers: {
          'Authorization': 'Hasura ' + window.localStorage['token']
        }
      };
                  
      $http(removeFromFavReq).then(function(response){
        // console.log(response); 
        var i;
        for(i=0; i<$scope.favList.length; i++){
          if($scope.favList.id == id){
            $scope.favList.splice(i, 1);
          }
        }
      }, function(response){
          console.log(response);
      });
    };
    
    $scope.fromFavToCart = function(item){
      $scope.currentOutlet = outlets.getOutlet();
      
      var count = cart.addToCart(item, $scope.currentOutlet.id);
      
      // console.log(count);
      
      if(count == 1){
        var alertCart = $ionicPopup.alert({
          title: 'Item has been added to cart!',
          template: 'You can continue to add items or checkout by clicking the cart icon in the bottom tab bar'
        });
                
        alertCart.then(function(res) {
        
        });
        
      }
    };
    
}])

.controller('ProfileCtrl', [ '$scope', '$window', '$ionicPopup', 'userDetails', '$http', '$interval', '$rootScope', 
  function($scope, $window, $ionicPopup, userDetails, $http, $interval, $rootScope) {
    
  $scope.$on('$ionicView.enter', function() {
    if(navigator.onLine) {
      $scope.isOnline = true;
    }
    else{
      $scope.isOnline = false;
    } 
    
    var screenWidth = $window.innerWidth;
    
    if (screenWidth < 700){
        $scope.isMobile = true;
    }else{
        $scope.isMobile = false;
    }
  });  
  console.log(parseInt(window.localStorage['currentUserId']));
   var userReq = {
            method: 'POST',
            url: server + '1/table/users/select',
            data: {
              'columns': ["*", {
                "name": "account",
                "columns": ["*"]
              }],
              'where': {'id': parseInt(window.localStorage['currentUserId'])}
            },
            headers: {
              'Authorization': 'Hasura ' + window.localStorage['token']
            }
          };
          $http(userReq).then(function(response){
            console.log(response.data);
            userDetails.addUser(response.data[0]);
            $scope.user = userDetails.getUser();
        },
          function(response){
            console.log(response);
    });
    
    var accountsfn = function(){
      var accountsReq = {
              method: 'POST',
              url: server + '1/table/account/select',
              data: {
                'columns': ["*"],
                'where': {'userId': parseInt(window.localStorage['currentUserId'])}
              },
              headers: {
                'Authorization': 'Hasura ' + window.localStorage['token']
              }
            };
            $http(accountsReq).then(function(response){
              $scope.accounts = response.data;
          },
            function(response){
              console.log(response);
      });      
    };
    
      $scope.stop = $interval(accountsfn, 1000);
  
      var dereg = $rootScope.$on('$locationChangeSuccess', function() {
        $interval.cancel($scope.stop);
        dereg();
      });
    
    $scope.addAccount = function() {
    
      var addAccount = $ionicPopup.confirm({
        templateUrl: 'templates/addAccount.html',
        title: 'Registered Account :',
        // subTitle: 'Please use normal things',
        scope: $scope,
        buttons: [
             { text: 'Cancel',
               onTap: function(e) {
                 var check = 0;
                // alert($scope.deleteAccount.password);
                 return {
                   check: check
                 };
               }
             },
             {
               text: '<b>OK</b>',
               type: 'button-assertive',
               onTap: function(e) {
                 var check = 1;
                // alert($scope.deleteAccount.password);
                 return {
                   check: check
                 };
               }
             },
           ]
      });
      
      addAccount.then(function(res) {
        
        if(res.check == 1){
          var regEmail = userDetails.getAccountEmail();
          var str = regEmail.split('').reverse().join('');
          var verification = str.substring(0, 11);
          console.log(verification);
          
          if(verification != "ni.ca.mtii."){
            var alertPopup = $ionicPopup.alert({
               title: 'Error!',
               template: 'Invalid smail!'
             });
          
             alertPopup.then(function(res) {
             });  
          }
          else {
                var accountReq = {
                  method: 'POST',
                  url: server + '1/table/account/insert',
                  data: {
                    "objects":[{
                      'userId': parseInt(window.localStorage['currentUserId']),
                      'isActive': false,
                      'regEmail': regEmail,
                      'authKey': 'iitmadras'
                    }]
                  },
                  headers: {
                    'Authorization': 'Hasura ' + window.localStorage['token']
                  }
                };
                $http(accountReq).then(function(response){
                  var alertPopup = $ionicPopup.alert({
                     title: 'Success!',
                     template: 'Please check your smail to verify you account'
                   });
                
                   alertPopup.then(function(res) {
                   }); 
                  // console.log(response.data);
                  var emailReq = {
                    method: 'POST',
                    url: 'https://server.sqippr.com/email',
                    data: {
                      email: "contactus@sqippr.com",
                      subject: "sQippr || Verify your registered account",
                      recipient: regEmail,
                      userId: parseInt(window.localStorage['currentUserId']),
                      html:"<div style='width: 100%; background-color: white'><br><p style='text-align: right; font-size: 30px'>s<span style='color: #F39C12; font-size: 35px'>Q</span>ippr</p><hr style='color: #F39C12; height: 2px; width: 100%; background-color: #F39C12'><h3 style='color: #F39C12'>Greetings from the sQippr team!</h3> Thank you for signing up with sQippr. Please click on  https://ui.sqippr.com/activateAccount.html and enter the token : {{token}} to verify your registered account<br><br><div style='background-color: #1b1b1b;width: 100%'><br><a href='https://www.sqippr.com' style='text-decoration:none'><p style='color: #F39C12; text-align:center'>www.sqippr.com</p></a><table style='width: 100%'><tr><td style='width: 20%; text-align:center;'><a href='https://www.facebook.com/sqippr' style='text-decoration:none'><p style='color: #F39C12'>Facebook</p></a></td><td style='width: 20%; text-align:center;'><p style='color: #F39C12'>|</p></td><td style='width: 20%; text-align:center;'><a href='https://www.twitter.com' style='text-decoration:none'><p style='color: #F39C12'>Twitter</p></a></td><td style='width: 20%; text-align:center;'><p style='color: #F39C12'>|</p></td><td style='width: 20%; text-align:center;'><a href='https://www.google.com' style='text-decoration:none'><p style='color: #F39C12'>Google Playstore</p></a></td></tr></table></div><div style='background-color: #F39C12;width: 100%'><br><p style='color: white; text-align: center'><b>WE BE SQIPPIN' 'N' FLIPPIN' WHILE THEY HAIR RIPPIN'</b></p><p style='color: white; text-align: center'>&copy 2016 sQippr, All Rights Reserved</p><br></div><p style='text-align: center'>*****Please do not respond to this mail*****</p>div>"
                    }
                  };
                  $http(emailReq).then(function(response){
                    console.log(response.data);
                },
                  function(response){
                    console.log(response);
        }); 
                  
              },
                function(response){
                  console.log(response);
                  var alertPopup = $ionicPopup.alert({
                     title: 'Error!',
                     template: 'Account already exists'
                   });
                
                   alertPopup.then(function(res) {
                   }); 
            }); 
          }
        }     
      });
    };
    
    $scope.showInfo = function(){
      var alertPopup = $ionicPopup.alert({
        title: 'Info',
        template: 'You can add your institute\'s registered accounts here'
      });
      
      alertPopup.then(function(res) {
        console.log('can not order');
      });
    };
}])

.controller('awaitingConfirmationCtrl', [ '$scope', '$ionicPopup', 'orders', '$interval', '$timeout', '$window', 'roundProgressService', '$http', '$location', 'userDetails', 'cart',

  function($scope, $ionicPopup, orders, $interval, $timeout, $window, roundProgressService, $http, $location, userDetails, cart) {
  $scope.$on('$ionicView.enter', function() {
    orders.addProgress(true);
    if(navigator.onLine) {
      $scope.isOnline = true;
    }
    else{
      $scope.isOnline = false;
    } 
    
    var screenWidth = $window.innerWidth;
    
    if (screenWidth < 700){
        $scope.isMobile = true;
    }else{
        $scope.isMobile = false;
    }
  });
    $scope.user = userDetails.getUser();
    
            $scope.current =        27;
            $scope.max =            50;
            $scope.offset =         0;
            $scope.timerCurrent =   0;
            $scope.uploadCurrent =  0;
            $scope.stroke =         8;
            $scope.radius =         80;
            $scope.isSemi =         false;
            $scope.rounded =        false;
            $scope.responsive =     false;
            $scope.clockwise =      true;
            $scope.currentColor =   '#45ccce';
            $scope.bgColor =        '#eaeaea';
            $scope.duration =       800;
            $scope.currentAnimation = 'easeOutCubic';
            $scope.animationDelay = 0;

            $scope.increment = function(amount){
                $scope.current+=(amount || 1);
            };

            $scope.decrement = function(amount){
                $scope.current-=(amount || 1);
            };

            $scope.animations = [];

            angular.forEach(roundProgressService.animations, function(value, key){
                $scope.animations.push(key);
            });

            $scope.getStyle = function(){
                var transform = ($scope.isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';

                return {
                    'top': $scope.isSemi ? 'auto' : '50%',
                    'bottom': $scope.isSemi ? '5%' : 'auto',
                    'left': '50%',
                    'transform': transform,
                    '-moz-transform': transform,
                    '-webkit-transform': transform,
                    'font-size': $scope.radius/3.5 + 'px'
                };
            };

            $scope.getColor = function(){
                return $scope.gradient ? 'url(#gradient)' : $scope.currentColor;
            };

            $scope.showPreciseCurrent = function(amount){
                $timeout(function(){
                    if(amount <= 0){
                        $scope.preciseCurrent = $scope.current;
                    }else{
                        var math = $window.Math;
                        $scope.preciseCurrent = math.min(math.round(amount), $scope.max);
                    }
                });
            };

            var getPadded = function(val){
                return val < 10 ? ('0' + val) : val;
            };
            
            var minutes = 2;
            var seconds = 59;
            var orderStatus = '';
            var minutesInSeconds = 119;
            
            var awaitingConfirmation = function(){
                var date = new Date();
                // var hours = date.getHours();
                console.log('running');
                minutesInSeconds -= 1;
                if( seconds === 0){
                  seconds = 60;
                  minutes -= 1;
                } 
                else{
                  seconds -= 1; 
                }

                // $scope.hours = hours;
                $scope.minutesInSeconds = minutesInSeconds;
                $scope.minutes = minutes;
                $scope.seconds = seconds;
                $scope.time = getPadded(minutes-1) + ':' + getPadded(seconds);
                
                if(minutes === 1 && seconds === 1){
                  location.href ='#/tab/confirmation';                  
                }
            };
            
            var isConfirmed = function(){
               var orderHistoryReq = {
                method: 'POST',
                url: server + '1/table/orders/select',
                data: {
                  "columns": ['status'],
                  "where": {'id': cart.getCurrentOrder()}
                },
                headers: {
                  'Authorization': 'Hasura ' + window.localStorage['token']
                }
              };
                      
              $http(orderHistoryReq).then(function(response){
                if(response.data[0].status == 'confirmed' || response.data[0].status == 'canceled'){
                  location.href = '#/tab/confirmation';
                  $interval.cancel(promise); 
                  $interval.cancel(promiseConfirm);  
                }
              }, function(response){
                console.log(response);
              });
            };
            
            var promise = $interval(awaitingConfirmation, 1000);
            var promiseConfirm = $interval(isConfirmed, 1000);
            
            $scope.$on('$destroy',function(){
                  if(promise){
                      $interval.cancel(promise);   
                  } 
                  if(promiseConfirm){
                    $interval.cancel(promiseConfirm);   
                  }
              });
            
            setTimeout(function(){
              $interval.cancel(promise); 
              $interval.cancel(promiseConfirm);  
            }, 120000);
            
    $scope.cancelOrder = function(){
      var confirmPopup = $ionicPopup.confirm({
        title: 'Alert!',
        template: 'Are you sure you want to cancel your order?'
      });
       
      confirmPopup.then(function(res) {
        if(res) {
          var updateOrderReq = {
            method: 'POST',
            url: server + '1/table/orders/update',
            data: {
              "$set":{"status": "canceled"},
              "where": {'id': cart.getCurrentOrder()}
            },
            headers: {
              'Authorization': 'Hasura ' + window.localStorage['token']
            }
          };
          
          $http(updateOrderReq).then(function(response){
            console.log(response);
          }, function(response){
            console.log(response);
          });
          location.replace('index.html');
        } else {
          
        }
      });      
    };
}])

.controller('confirmationCtrl', ['$scope', '$http', 'orders', '$location', 'userDetails', 'cart', '$window',

  function($scope, $http, orders, $location, userDetails, cart, $window){
  
  var timestamp = orders.getTimeStamp();
    var userReq = {
            method: 'POST',
            url: server + '1/table/users/select',
            data: {
              'columns': ["*", {
                "name": "account",
                "columns": ["*"]
              }],
              'where': {'id': parseInt(window.localStorage['currentUserId'])}
            },
            headers: {
              'Authorization': 'Hasura ' + window.localStorage['token']
            }
          };
          $http(userReq).then(function(response){
            console.log(response.data);
            userDetails.addUser(response.data[0]);
  var confirmationOrdersReq = {
    method: 'POST',
    url: server + '1/table/orders/select',
    data: {
        "columns":[
                "*",
                {
                    "name": "items",
                    "columns": [
                            "*",
                            {
                                "name":"item",
                                "columns": ["*"]
                            }
                        ]
                },
                {
                  "name": "outlet",
                  "columns": ["*"]
                }
            ],
        "where": {
          "timestamp": timestamp
        }
    },
    headers: {
        'Authorization': 'Hasura ' + window.localStorage['token']
      }
  };
  
  $http(confirmationOrdersReq).then(function(response){
    console.log(response);
    var user = userDetails.getUser();
    console.log(user);
    $scope.name = user.name;
    $scope.email = user.email;
    $scope.mobile = user.mobile;

    var orders = response.data;
    $scope.orders = orders;
    $scope.timestamp = timestamp;
    $scope.token = orders[0].token;
    $scope.isParcel = orders[0].isParcel;
    $scope.isDelivery = orders[0].isDelivery;
    
    $scope.isDelivery = orders[0].isDelivery;
    $scope.takeAwayTime = getPadded(orders[0].takeAwayHour)+':'+getPadded(orders[0].takeAwayMinute);
    $scope.paymentMethod = response.data[0].paymentMethod;
    
    if(orders[0].paymentMethod == 'cashOnDelivery'){
      $scope.isCoD = true;
    }
    $scope.cancel_reason = orders[0].cancel_reason;
    console.log($scope.cancel_reason);
    
    var i;
    $scope.total = 0;
    $scope.packing = 0;
    $scope.convenience = 0;
    $scope.delivery = 0;
    $scope.totalAmount = 0;
    
    $scope.confirmedOrders = [];
    
    if(orders[0].status === 'canceled'){
      $scope.status = false;
    }
    else {
     for(i=0; i < orders.length; i++){
      if(orders[i].status == "confirmed"){
        $scope.confirmedOrders.push(orders[i]);
        $scope.totalAmount += orders[i].totalAmount;
        $scope.packing += orders[i].packing_charge;
        $scope.delivery += orders[i].delivery_charge;
        $scope.convenience += orders[i].conv_charge;
        $scope.total += orders[i].billAmount;
      }
      $scope.status = true;
    }
      
      if($scope.confirmedOrders.length !==0 && $scope.isCod !== true){
        $scope.check = true;
      }
    }
    console.log('KuUttQ'+'|'+$scope.token+'|'+$scope.totalAmount+'|'+'food order'+'|'+$scope.name+
                      '|'+$scope.email+'|||||||||||'+'rbCbgBzB');
    $scope.sha512 = sha512('KuUttQ'+'|'+$scope.token+'|'+$scope.totalAmount+'|'+'food order'+'|'+$scope.name+
                      '|'+$scope.email+'|||||||||||'+'rbCbgBzB');
    
        var updateHashReq = {
          method: 'POST',
          url: server + '1/table/orders/update',
          data: {
            "$set":{"hash_string": 'KuUttQ'+'|'+$scope.token+'|'+$scope.totalAmount+'|'+'food order'+'|'+$scope.name+
                    '|'+$scope.email+'|||||||||||'+'rbCbgBzB'},
            "where": {"timestamp": timestamp}
          },
          headers: {
            'Authorization': 'Hasura ' + window.localStorage['token']
          }
        };
        
        $http(updateHashReq).then(function(response){
          console.log(response);
        }, function(response){
          console.log(response);
        });
    
  }, function(response){
    console.log(response);
  });
        },
          function(response){
            console.log(response);
    });
  $scope.$on('$ionicView.enter', function() {
    if(navigator.onLine) {
      $scope.isOnline = true;
    }
    else{
      $scope.isOnline = false;
    } 
    
    var screenWidth = $window.innerWidth;
    
    if (screenWidth < 700){
        $scope.isMobile = true;
    }else{
        $scope.isMobile = false;
    }
  });
    
    var getPadded = function(val){
      return val < 10 ? ('0' + val) : val;
    };
    
  if(timestamp === undefined || timestamp === null || timestamp === ''){
    location.replace('index.html');
  }

      $scope.submit = function(){
        
          document.getElementById('payForm').submit();
      };
    
    $scope.returnToMenu = function() {
      location.replace('index.html');
    };
    
}])

.controller('orderHistoryCtrl', [ '$scope', '$http', '$window', 'orders','userDetails', '$ionicScrollDelegate', 
  
  function($scope, $http, $window, orders, userDetails, $ionicScrollDelegate) {
  $scope.$on('$ionicView.enter', function() {
    if(navigator.onLine) {
      $scope.isOnline = true;
    }
    else{
      $scope.isOnline = false;
    } 
    
    var screenWidth = $window.innerWidth;
    
    if (screenWidth < 700){
        $scope.isMobile = true;
    }else{
        $scope.isMobile = false;
    }
  });
  
    $scope.scrollToTop = function(){
      console.log('works');
      $ionicScrollDelegate.scrollTop();
    };
    
    $scope.user = userDetails.getUser();
      
      var outletsReq = {
        method: 'POST',
        url: server + '1/table/outlets/select',
        data: {
          "columns": ['id', "name"]
        }
      };
      
      $http(outletsReq).then(function(response){
            // console.log(response.data);
            var outlets = response.data;
            
            var orderHistoryReq = {
              method: 'POST',
              url: server + '1/table/orders/select',
              data: {
                "columns": ['outletId', 'status', 'id','timestamp', 'token', 'payment_status'],
                "where": { 'userId': parseInt(window.localStorage['currentUserId'])}
              },
              headers: {
                'Authorization': 'Hasura ' + window.localStorage['token']
              }
            };
                    
            $http(orderHistoryReq).then(function(response){
              $scope.orders = [];
              var i, j;
              
              console.log(outlets);
              var monthNames = [
                "January", "February", "March",
                "April", "May", "June", "July",
                "August", "September", "October",
                "November", "December"
              ];
              
              for( i=0; i<outlets.length; i++){
                for( j=0; j< response.data.length; j++){
                   if(outlets[i].id === response.data[j].outletId){
                      var dummy = {};
                      if(response.data[j].timestamp !== undefined && response.data[j].timestamp !== null){
                        var date = new Date(response.data[j].timestamp);
                        dummy.time = monthNames[date.getMonth()]+' '+date.getDate()+', '+date.getFullYear();
                      }
                      else {
                        dummy.time = '';
                      }
                      dummy.id = parseInt(response.data[j].id);
                      dummy.name = outlets[i].name;
                      dummy.status = response.data[j].status;
                      dummy.token = response.data[j].token;
                      dummy.paymentStatus = response.data[j].payment_status;
                      $scope.orders.push(dummy);
                    } 
                }
              }
              
              // console.log(response); 
              // console.log($scope.orders);
            },function(response){
                console.log(response);
            });

          },function(response){
            console.log(response);
      });
      
      $scope.openOrderSummary = function(order){
        orders.addOrders(order);
      };

}])

.controller('orderSummaryCtrl', ['$scope', '$http', 'orders', 'userDetails', '$window',

  function($scope, $http, orders, userDetails, $window){
  $scope.$on('$ionicView.enter', function() {
    if(navigator.onLine) {
      $scope.isOnline = true;
    }
    else{
      $scope.isOnline = false;
    } 
    
    var screenWidth = $window.innerWidth;
    
    if (screenWidth < 700){
        $scope.isMobile = true;
    }else{
        $scope.isMobile = false;
    }
  });
    $scope.user = userDetails.getUser();
    var order = orders.getOrders(order);
    console.log(order);
    $scope.order = order;
    var itemsSummaryReq = {
      method: 'POST',
      url: server + '1/table/items/select',
      data: {
        "columns": ['*']
      },
      headers: {
        'Authorization': 'Hasura ' + window.localStorage['token']
      }
    };
                        
    $http(itemsSummaryReq).then(function(response){
      console.log(response.data);
      var items = response.data;
      
            var orderSummaryReq = {
              method: 'POST',
              url: server + '1/table/orders/select',
              data: {
                "columns": ['*'],
                "where": { 'id': order.id}
              },
              headers: {
                'Authorization': 'Hasura ' + window.localStorage['token']
              }
            };
                    
            $http(orderSummaryReq).then(function(response){
              
                var getPadded = function(val){
                  return val < 10 ? ('0' + val) : val;
                };
                // console.log(response); 
                
                $scope.isDelivery = response.data[0].isDelivery;
                $scope.deliveryTime = getPadded(response.data[0].takeAwayHour)+':'+getPadded(response.data[0].takeAwayMinute);
                $scope.totalAmount = response.data[0].totalAmount;
                $scope.billAmount = response.data[0].billAmount;
                $scope.packing_charge = response.data[0].packing_charge;
                $scope.delivery_charge = response.data[0].delivery_charge;
                $scope.conv_charge = response.data[0].conv_charge;
                
                var orderedItemsSummaryReq = {
                  method: 'POST',
                  url: server + '1/table/orderedItems/select',
                  data: {
                    "columns": ['*'],
                    "where": { 'orderId': order.id}
                  },
                  headers: {
                    'Authorization': 'Hasura ' + window.localStorage['token']
                  }
                };
                        
                $http(orderedItemsSummaryReq).then(function(response){
                  console.log(response); 
                  var i, j;
                  $scope.orderSummary = [];
                  
                  for( i=0; i<response.data.length; i++){
                    for(j=0; j<items.length; j++) {
                      if(response.data[i].isAvailable === true){
                          if(items[j].id == response.data[i].itemId){
                      
                          var dummy = {};
                          dummy.name = items[j].name;
                          dummy.price = items[j].price;
                          dummy.quantity = response.data[i].quantity;
                          dummy.minTime = items[j].minTime;
                          $scope.orderSummary.push(dummy);
                        }                        
                      }
                    }
                  }
                  console.log($scope.orderSummary);
                  
                },function(response){
                    console.log(response);
                });
              
            },function(response){
                console.log(response);
            });
    },function(response){
      console.log(response);
    });
    
}])

.controller('takeAwayTimeCtrl', ['$scope', 'cart', '$ionicPopup',
  
  function($scope, cart, $ionicPopup){
    
    var nowTime = new Date();
    $scope.mydatetime = nowTime.getTime()+cart.getMinTime()*60000;
    // $scope.takeAwayHour = minDeliveryHour;
    // $scope.takeAwayMinutes = minDeliveryMinutes;
    
    // $scope.$watchGroup(['takeAwayMinutes', 'takeAwayHour'], function(newValues, oldValues, scope) {
      
      // var alertPopup = $ionicPopup.alert({
      //   title: 'Invalid Time!',
      //   template: 'Orders can only be made within 3 hours after expected take-away time'
      // });
      
      // alertPopup.then(function(res) {
      //   console.log('can not order');
      // });
      
    //   cart.addHour($scope.takeAwayHour);
    //   cart.addMinute($scope.takeAwayMinutes);
      
    // }, true);
    
    $scope.$watch('mydatetime', function(newValues, oldValues, scope){
      var time = new Date($scope.mydatetime);
      cart.addTimestamp(time);
      cart.addHour(time.getHours());
      cart.addMinute(time.getMinutes());
    }, true);

}])

.controller('takeAwayPopupCtrl', ['$scope', 'cart',

  function($scope, cart){
    $scope.$watch('choice', function(newValues, oldValues, scope) {
      cart.addChoice($scope.choice);
    });
    
}])

.controller('paymentSuccessCtrl', ['$scope', '$location', 'orders',

  function($scope, $location, orders){
    $scope.replace = function(){
      orders.addProgress(false);
      location.replace('index.html');
    };
}])

.controller('paymentFailedCtrl', ['$scope', '$location',

  function($scope, $location){
    $scope.$on('$ionicView.enter', function() {
      if(navigator.onLine) {
        $scope.isOnline = true;
      }
      else{
        $scope.isOnline = false;
      } 
      
      var screenWidth = $window.innerWidth;
      
      if (screenWidth < 700){
          $scope.isMobile = true;
      }else{
          $scope.isMobile = false;
      }
    });
    $scope.replace = function(){
      location.replace('index.html');
    };
}])

.controller('deliveryPopupCtrl', ['$scope', 'cart',

  function($scope, cart){
    $scope.$watch('choice', function(newValues, oldValues, scope) {
      cart.addChoice($scope.choice);
    });
    
}])

.controller('deliveryAddressPopupCtrl', ['$scope', 'cart',

  function($scope, cart){
    $scope.address = '';
    $scope.$watch('address', function(newValues, oldValues, scope) {
      cart.addAddress($scope.address);
      console.log($scope.address);
    });
    
}])

.controller('changePassPopupCtrl', ['$scope', 'userDetails',

  function($scope, userDetails){
    // $scope.$watch('choice', function(newValues, oldValues, scope) {
    //   userDetails.addChangePassword([$scope.oldPassword, $scope.newPassword]);
    // });
    
}])

.controller('addAccountCtrl', ['$scope', 'userDetails',

  function($scope, userDetails){
    $scope.$watch('regEmail', function(newValues, oldValues, scope) {
      userDetails.addAccountEmail($scope.regEmail);
    });
    
}])

.controller('trialCtrl', ['$scope', '$document', '$http',

  function($scope, $document, $http){
    // $scope.token = '13O6FauP';
    // $scope.totalAmount = 50;
    // $scope.name = 'user1';
    // $scope.email = 'user@mail.com';
    // $scope.phone = '55392010';
    
    //   $scope.sha512 = sha512('gtKFFx'+'|'+$scope.token+'|'+$scope.totalAmount+'|'+'food order'+'|'+$scope.name+
    //                   '|'+$scope.email+'|||||||||||'+'eCwWELxi');
    //   console.log($scope.sha512);
    //   console.log(document.getElementById('payForm'));
    //   $scope.submit = function(){
    //     document.getElementById('payForm').submit();
        
        // var updateHashReq = {
        //   method: 'POST',
        //   url: server + '1/table/orders/update',
        //   data: {
        //     "$set":{"hash_string": 'gtKFFx'+'|'+$scope.timestamp+'|'+$scope.totalAmount+'|'+'food order'+'|'+$scope.user.name+
        //             '|'+$scope.user.email+'|||||||||||'+'eCwWELxi'},
        //     "where": {"timestamp": $scope.timestamp}
        //   },
        //   headers: {
        //     'Authorization': 'Hasura ' + window.localStorage['token']
        //   }
        // };
        
        // $http('updateHashReq').then(function(response){
        //   document.getElementById('payForm').submit();
        // }, function(response){
        //   console.log(response);
        // });
      // };    
    $scope.sendEmail = function(){
      console.log('i work');

     var emailReq = {
        method: 'POST',
        url: 'https://server.sqippr.com/email',
        data: {
            email: "contactus@sqippr.com",
            subject: "Verify your registered account",
            recipient: "aslamahrahiman@gmail.com",
            userId: 2,
            html: "<h3>Hello!</h3> <br><br><table><tr><th>col 1</th><th>col 2</th></tr><tr><td>1</td><td>2</td></tr></table> "
            }
                  };
                  $http(emailReq).then(function(response){
                    console.log(response.data);
                },
                  function(response){
                    console.log(response);
        });    
    } ;
      
    
}])

.controller('inviteFriendsCtrl', ['$scope', '$window', '$http', '$ionicLoading', function($scope, $window, $http, $ionicLoading){
  $scope.$on('$ionicView.enter', function() {
    if(navigator.onLine) {
      $scope.isOnline = true;
    }
    else{
      $scope.isOnline = false;
    } 
    
    var screenWidth = $window.innerWidth;
    
    if (screenWidth < 700){
        $scope.isMobile = true;
    }else{
        $scope.isMobile = false;
    }
  });  
  
  $scope.invite = function(email){
       $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
        var emailReq = {
          method: 'POST',
          url:'https://server.sqippr.com/email_receipt',
          data: {
            email: "contactus@sqippr.com",
            subject: "sQippr || You are invited !",
            recipient: email,
            html:"<div style='width: 100%; background-color: white'><br><p style='text-align: right; font-size: 30px'>s<span style='color: #F39C12; font-size: 35px'>Q</span>ippr</p><hr style='color: #F39C12; height: 2px; width: 100%; background-color: #F39C12'><h3 style='color: #F39C12'>Greetings from the sQippr team!</h3> <p>Specifically designed to make dining a unique experience, sQippr is your next stop at an all in one food ordering solution. Operating mostly out of IT Parks, colleges and food courts at malls, it provides the ultimate pathway to get rid of queues!</p><br><p>Tired of waitiing in queues? <br>With sQippr, you can order your food are specify a time of delivery of your choice and totally avoid the exasperating queues and endless wait for food.</p><br><p>Try out sQippr now!</p><br><br><div style='background-color: #1b1b1b;width: 100%'><br><a href='https://www.sqippr.com' style='text-decoration:none'><p style='color: #F39C12; text-align:center'>www.sqippr.com</p></a><table style='width: 100%'><tr><td style='width: 20%; text-align:center;'><a href='https://www.facebook.com/sqippr' style='text-decoration:none'><p style='color: #F39C12'>Facebook</p></a></td><td style='width: 20%; text-align:center;'><p style='color: #F39C12'>|</p></td><td style='width: 20%; text-align:center;'><a href='https://www.twitter.com' style='text-decoration:none'><p style='color: #F39C12'>Twitter</p></a></td><td style='width: 20%; text-align:center;'><p style='color: #F39C12'>|</p></td><td style='width: 20%; text-align:center;'><a href='https://www.google.com' style='text-decoration:none'><p style='color: #F39C12'>Google Playstore</p></a></td></tr></table></div><div style='background-color: #F39C12;width: 100%'><br><p style='color: white; text-align: center'><b>WE BE SQIPPIN' 'N' FLIPPIN' WHILE THEY HAIR RIPPIN'</b></p><p style='color: white; text-align: center'>&copy 2016 sQippr, All Rights Reserved</p><br></div><p style='text-align: center'>*****Please do not respond to this mail*****</p>div>",
            token: ''
          }
        };
   
        $http(emailReq).then(function(response){
          $ionicLoading.hide();
          $scope.check = true;
          location.href = 'index.html';
          // location.replace();
        }, function(response){
            console.log(response);
        }) ; 
  };
}])
.controller('accountSettingsCtrl', ['$scope', '$http', '$ionicPopup', 'userDetails',

  function($scope, $http, $ionicPopup, userDetails){
  $scope.$on('$ionicView.enter', function() {
    if(navigator.onLine) {
      $scope.isOnline = true;
    }
    else{
      $scope.isOnline = false;
    } 
    
    var screenWidth = $window.innerWidth;
    
    if (screenWidth < 700){
        $scope.isMobile = true;
    }else{
        $scope.isMobile = false;
    }
  });
    $scope.user = userDetails.getUser();
   $scope.changePassword = function(){
     
     var changePasswordPopup = $ionicPopup.confirm({
      templateUrl: 'templates/changePasswordPopup.html',
      title: 'Change Password :',
      // subTitle: 'Please use normal things',
      scope: $scope,
      buttons: [
           { text: 'Cancel',
             onTap: function(e) {
               var check = 0;
              // alert($scope.deleteAccount.password);
               return {
                 check: check
               };
             }
           },
           {
             text: '<b>Change</b>',
             type: 'button-assertive',
             onTap: function(e) {
               var check = 1;
              // alert($scope.deleteAccount.password);
               return {
                 check: check
               };
             }
           },
         ]
    });
    var changePassword = userDetails.getChangePassword;
    
    changePasswordPopup.then(function(res) {
      
      if( res.check == 1){
       var changePasswordReq = {
        method: 'POST',
          url: 'https://auth.sqippr.com/user/password/change',
          data: {
            'password': changePassword[0],
            'new_password': changePassword[1],
          },
            headers: {
              'Authorization': 'Hasura ' + window.localStorage['token']
          }
        };
                    
        $http(changePasswordReq).then(function(response){
          console.log(response); 
        }, function(response){
            console.log(response);
        }) ;
      }
      
    });
   };
}]);


