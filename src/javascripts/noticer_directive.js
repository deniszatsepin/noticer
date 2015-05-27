/**
 * Created by Denis Zatsepin <denis@zatsepin.spb.ru>
 * on 20.04.15.
 */

(function(angular, module) {

	module.directive('zNoticer', NotificationsDirective);

	NotificationsDirective.$inject = ['Noticer'];

	function NotificationsDirective(Noticer) {

		return {
			scope: {
				route: '@noticerRoute',
				level: '@noticerLevel'
			},

			templateUrl: 'templates/notification.html',

			controller: ['$scope', '$interval', function($scope, $interval) {
        _.assign($scope, {
          notifications: []
        });

        //Directive initialization
        init();

				var unsubscribe = null;
				function init() {
					var route = $scope.curRoute = $scope.route || '';
					unsubscribe = Noticer.on(route, noticeHandler);
					getPendingNotifications();
					$scope.interval = $interval(intervalHandler, 100, 0, false);
				}

        function getPendingNotifications() {
					var unread = Noticer.getUnread($scope.curRoute);
					_.each(unread, function(notice) {
						$scope.notifications.push(notice);
					});
        }

				function intervalHandler() {

				}

				function noticeHandler(notification) {
					$scope.notifications.push(notification);
				}

				function scopeDestroyHandler() {
					//Noticer.off($scope.curRoute, noticeHandler);
					if (typeof unsubscribe === 'function') {
						unsubscribe();
					}
				}

				$scope.$on('$destroy', function() {
					scopeDestroyHandler();
					if ($scope.interval) {
						$interval.cancel($scope.interval);
					}

				});
			}],

			link: function($scope, $element) {
			}
		}
	}

})(angular, angular.module('noticer'));