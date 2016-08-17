angular.module('starter.services', [])

.factory('userDetails', [ function() {
  
  var user = {};
  
  var addUser = function(newUser) {
    user = newUser;
  };
  var getUser = function(){
    return user;
  };

  var token = {};
  
  var addToken = function(newToken) {
    token = newToken;
  };
  var getToken = function(){
    return token;
  };
  
  var changePassword = [];
  var addChangePassword = function(passArray){
    changePassword = passArray;
  };
  var getChangePassword = function(){
    return changePassword;
  };
  
  var email = '';
  var addAccountEmail = function(newEmail){
    email = newEmail;
  };
  var getAccountEmail = function(){
    return email;
  };
  
  var choice = '';
  var addChoice = function(newChoice){
    choice = newChoice;
  };
  var getChoice = function(){
    return choice;
  };
  
  return {
    getUser: getUser,
    addUser: addUser,
    getToken: getToken,
    addToken: addToken,
    addChangePassword: addChangePassword,
    getChangePassword: getChangePassword,
    addAccountEmail: addAccountEmail,
    getAccountEmail: getAccountEmail,
    addChoice: addChoice,
    getChoice: getChoice
  };  
  
}])

.factory('orders', [ function() {
  
  var order = {};
  
  var addOrders = function(newOrder) {
    order = newOrder;
  };
  var getOrders = function(){
    return order;
  };
  
  var timestamp = '';
  var addTimeStamp = function(newTimeStamp){
    timestamp = newTimeStamp;
  };
  var getTimeStamp = function(){
    return timestamp;
  };
  
  return {
    getOrders: getOrders,
    addOrders: addOrders,
    addTimeStamp: addTimeStamp,
    getTimeStamp: getTimeStamp
  };  
  
}])
.factory('outlets', [ function() {
  
  var outlet = {};
  
  var addOutlet = function(newOutlet) {
    outlet = newOutlet;
  };
  var getOutlet = function(){
    return outlet;
  };
  
  var outletName = {};
  
  var addOutletName = function(newOutletName) {
    outletName = newOutletName;
  };
  var getOutletName = function(){
    return outletName;
  };
  
  var outletsList = {};
  
  var addOutletsList = function(newOutletsList) {
    outletsList = newOutletsList;
  };
  var getOutletsList = function(){
    return outletsList;
  };
  
  var minTimes = [];
  var addminTimes = function(newMinTime){
    minTimes.push(newMinTime);
  };
  
  var getminTimes = function(){
    return minTimes;
  };
  
  return {
    getOutlet: getOutlet,
    addOutlet: addOutlet,
    getOutletsList: getOutletsList,
    addOutletsList: addOutletsList,
    getOutletName: getOutletName,
    addOutletName: addOutletName,
    addminTimes: addminTimes,
    getminTimes: getminTimes
  };
  
}])

.factory('favourites', function($http, $window) {
  
  var addToFavourites = function(newFavItem) {
    console.log(newFavItem);
        var addFav = function(newItem){
          var addToFavReq = {
            method: 'POST',
            url: server + '1/table/favourites/insert',
            data: {
              "objects": [{
                'userId': parseInt(window.localStorage['currentUserId']),
                'itemId': newItem.id
              }],
              "returning" : ["id"]
            },
            headers: {
              'Authorization': 'Hasura ' + window.localStorage['token']
            }
          };
        $http(addToFavReq).then(function(response){
            console.log(response);
            },
          function(response){
              console.log(response);
        });
       };
    
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
          console.log(response.data);
          var i;
          if(response.data.length === 0){
            addFav(newFavItem);
          }
          else{
            for(i=0; i< response.data.length; i++){
              if(response.data[i].id !== newFavItem.id){
                addFav(newFavItem);
              }
            } 
          }
          
        }, function(response){
            console.log(response);
        });
    
  };
  var removeFavourites = function(removeItem) {
    
    var removeFavReq = {
            method: 'POST',
            url: server + '1/table/favourites/delete',
            data: {
              "where": {'itemId': removeItem.id},
              "returning": ['id']
            },
            headers: {
              'Authorization': 'Hasura ' + window.localStorage['token']
            }
          };
        $http(removeFavReq).then(function(response){
            console.log(response);
            },
          function(response){
              console.log(response);
        });
    
  };
  
  return {
    addToFavourites: addToFavourites,
    removeFavourites: removeFavourites
  };
  
})

.factory('cart', function() {
  
  var cartList = [];
  var count = 0;

  var addToCart = function(newCartItem, outletId) {
    var dummyItem = {};
    var inCount = count+1;
    count += 1;
    var i, check = false;
    var index;

    // console.log(cartList.length);
    
    for( i=0; i<cartList.length; i++) {
      if( newCartItem.name == cartList[i].name) {
        check = true;
        index = i;
        break;
      }
    }
    
    if( check === false ){
      dummyItem.id = newCartItem.id;
      dummyItem.name = newCartItem.name;
      dummyItem.price = newCartItem.price;
      dummyItem.minTime = newCartItem.minTime;
      dummyItem.outletId = outletId;
      dummyItem.quantity = 1;
      // console.log(dummyItem);
      cartList.push(dummyItem);
    }
    else {
      dummyItem.id = newCartItem.id;
      dummyItem.name = newCartItem.name;
      dummyItem.price = newCartItem.price;
      dummyItem.minTime = newCartItem.minTime;
      dummyItem.quantity = cartList[index].quantity + 1;
      dummyItem.outletId = outletId;
      // console.log(dummyItem);
      cartList.splice(index, 1, dummyItem);
    }
    // console.log(cartList);
    // console.log('new item added to cart');
        return inCount;
  };
  
  var removeFromCart = function(removeCartItem, outletId) {
    var dummyItem = {};
    var i, check = false;
    var index;

    for( i=0; i<cartList.length; i++) {
      if( removeCartItem.name == cartList[i].name) {
        index = i;
        break;
      }
    }
    
      dummyItem.id = removeCartItem.id;
      dummyItem.name = removeCartItem.name;
      dummyItem.price = removeCartItem.price;
      dummyItem.minTime = removeCartItem.minTime;
      dummyItem.quantity = cartList[index].quantity - 1;
      dummyItem.outletId = outletId;
      
      if(dummyItem.quantity === 0){
        deleteFromCart(removeCartItem);
      }
      else {
        cartList.splice(index, 1, dummyItem);  
      }
    
    // console.log(cartList);
    // console.log('new item added to cart');
  };
  
  var deleteFromCart = function(deleteItem) {
    
    var deleteIndex = 0, i;
    
    for(i=0; i<cartList.length; i++) {
      if(deleteItem.name == cartList[i].name){
        deleteIndex = i;
        break;
      }
    }
    
    cartList.splice(deleteIndex, 1);
    console.log('delete from cart succesfully');
  };

  var hour = 0, minutes = 0, minHour = 0, minMinutes = 0, minTime = 0;
  
  var addMinTime = function(newTime) {
    minTime = newTime;
  };
  var getMinTime = function(){
    return minTime;
  };
  
  var addHour = function(newHour) {
    hour = newHour;
  };
  var getHour = function(){
    return hour;
  };
  
  var addMinHour = function(newMinHour) {
    minHour = newMinHour;
  };
  var getMinHour = function(){
    return minHour;
  };
  
  var addMinMinutes = function(newMinMinutes) {
    minMinutes = newMinMinutes;
  };
  var getMinMinutes = function(){
    return minMinutes;
  };
  
  var addMinute = function(newMinutes) {
    minutes = newMinutes;
  };
  var getMinute = function(){
    return minutes;
  };
  
  var address = {};
  var addAddress = function(newAddress){
    address = newAddress;
  };
  
  var getAddress  = function(){
    return address;
  };
  
  var choice = '';
  var addChoice = function(newChoice){
    choice = newChoice;
    console.log(choice, 'works');
  };
  var getChoice = function(){
    console.log(choice, 'alls awesome');
    return choice;
  };
  
  var amt = 0.0;
  var addAmount = function(newAmt) {
    amt = newAmt;
  };
  var getAmount = function() {
    return amt;
  };
  
  var orderId = 0;
  var addCurrentOrder = function(newId){
    orderId = newId;
  };
  
  var getCurrentOrder = function(){
    return orderId;
  };
  
  var timestamp = '';
  var addTimestamp = function(newTimestamp){
    timestamp = newTimestamp;
  };
  
  var getTimestamp = function(){
    return timestamp;
  };
  
  return {
    cartList: cartList,
    addToCart: addToCart,
    removeFromCart: removeFromCart,
    deleteFromCart: deleteFromCart,
    addMinute: addMinute,
    getMinMinutes: getMinMinutes,
    addMinMinutes: addMinMinutes,
    getMinute: getMinute,
    addHour: addHour,
    getHour: getHour,
    addMinHour: addMinHour,
    getMinHour: getMinHour,
    addAddress: addAddress,
    getAddress: getAddress,
    addChoice: addChoice,
    getChoice: getChoice,
    count: count,
    addMinTime: addMinTime,
    getMinTime: getMinTime,
    addAmount: addAmount,
    getAmount: getAmount,
    addCurrentOrder: addCurrentOrder,
    getCurrentOrder : getCurrentOrder,
    addTimestamp: addTimestamp,
    getTimestamp: getTimestamp
  };
  
  
});
