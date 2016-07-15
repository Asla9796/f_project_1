angular.module('starter.directives', [])

.directive("ngTimeSelector", function ($timeout) {
    return {
        restrict: 'EA',
        template: '<div class="timeSelectorDirective"> <div class="section hours"> <div class="increase" ng-click="increaseHours()"> <i class="icon fa fa-caret-up"></i> </div> <div class="display"> {{displayHours()}} </div> <div class="decrease" ng-click="decreaseHours()"> <i class="icon fa fa-caret-down"></i> </div> </div> <div class="section minutes"> <div class="increase" ng-click="increaseMinutes()"> <i class="icon fa fa-caret-up"></i> </div> <div class="display"> {{displayMinutes()}} </div> <div class="decrease" ng-click="decreaseMinutes()"> <i class="icon fa fa-caret-down"></i> </div> </div> <div class="section hours"> <div class="increase" ng-click="switchPeriod()"> <i class="icon fa fa-caret-up"></i> </div> <div ng-if="hours >= 12" class="display"> PM </div> <div ng-if="hours < 12" class="display"> AM </div> <div class="decrease" ng-click="switchPeriod()"> <i class="icon fa fa-caret-down"></i> </div> </div> </div>',
        scope: {
            hours: "=",
            minutes: "="
        },
        replace: true,
        link: function (scope, elem, attr) {

            //Create vars
            scope.period = "AM";

            /* Increases hours by one */
            scope.increaseHours = function () {

                //Check whether hours have reached max
                if (scope.hours < 23) {
                    scope.hours = ++scope.hours;
                }
                else {
                    scope.hours = 0;
                }
                $timeout(scope.hours);
            };

            /* Decreases hours by one */
            scope.decreaseHours = function () {

                //Check whether hours have reached min
                scope.hours = scope.hours <= 0 ? 23 : --scope.hours;
                $timeout(scope.hours);
            };

            /* Increases minutes by one */
            scope.increaseMinutes = function () {

                //Check whether to reset
                if (scope.minutes >= 59) {
                    scope.minutes = 0;
                }
                else {
                    scope.minutes++;
                }
                $timeout(scope.minutes);
            };

            /* Decreases minutes by one */
            scope.decreaseMinutes = function () {

                //Check whether to reset
                if (scope.minutes <= 0) {
                    scope.minutes = 59;
                }
                else {
                    scope.minutes = --scope.minutes;
                }
                $timeout(scope.minutes);
            };


            /* Displays hours - what the user sees */
            scope.displayHours = function () {

                //Create vars
                var hoursToDisplay = scope.hours;

                //Check whether to reset etc
                if (scope.hours > 12) {
                    hoursToDisplay = scope.hours - 12;
                }                

                //Check for 12 AM etc
                if (hoursToDisplay === 0) {

                    //Set to am and display 12
                    hoursToDisplay = 12;
                }
                else {

                    //Check whether to prepend 0
                    if (hoursToDisplay <= 9) {
                        hoursToDisplay = "0" + hoursToDisplay;
                    }
                }

                return hoursToDisplay;
            };
            /* Displays minutes */
            scope.displayMinutes = function () {
                return scope.minutes <= 9 ? "0" + scope.minutes : scope.minutes;
            };

            /* Switches the current period by ammending hours */
            scope.switchPeriod = function () {
                scope.hours = scope.hours >= 12 ? scope.hours - 12 : scope.hours + 12;
            };
        }
    };
})

	.directive('createSlider', function ($interval) {
		return {
			restrict: 'A',
			scope: {
				links: '=urls', current: '=', time: '@'
			},
			/* track by $index permite que en el array haya más de un valor duplicado*/
			template: '<ul class="slides" effect-slider>'+
							'<li ng-repeat="url in links track by $index" ng-style="{width: 100/links.length + \'%\'}">'+
								'<img ng-src="{{url}}"/>'+
							'</li>'+
						'</ul>'+
						'<div class="icons">'+
							'<span ng-repeat="icon in links track by $index" ng-class="{\'active\': $index == current}"" ng-click="showImg($index)"></span>'+
						'</div>',
						
			controller: function($scope, $element, $attrs){
				var intervalID = null;
				var restart = false;
				$scope.showImg = function(index){
					$scope.current = index;
					$interval.cancel(intervalID);
					restart = false;
					$scope.intervalManager(Number($scope.time) * 1000, restart);
				};

				$scope.intervalManager = function(time, flag){
					intervalID = $interval(function(){
						// - 1 porque $scope.links.length = 3 $scope.current va de 0, 1, 2
						if($scope.current!== $scope.links.length - 1){
							if(!flag){
								$scope.current++;
							}else{
								if($scope.current !== 0){
									$scope.current--;
								}else{
									flag = false;
									$scope.current++;
								}
							}
						}else{
							flag = true;
							$scope.current--;
						}
					}, time);
				};
			
				$scope.intervalManager(Number($scope.time) * 1000, restart);
				
			}, 
			link: function (scope, elem, attrs) {
				elem.css('width', scope.links.length*100 + '%');
			}
		};
	})

	.directive('effectSlider', function(){
		return{
			restrict: 'A',
			link: function(scope, elem, attrs){
				scope.$watch('current', function(){
					elem.css('transform', 'translateX(-' + scope.current * (100 / scope.links.length) + '%)');
				});
			}
		};
	});
