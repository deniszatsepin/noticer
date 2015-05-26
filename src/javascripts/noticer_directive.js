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

			controller: ['$scope', function($scope) {
        _.assign($scope, {
          notifications: []
        });

        //Directive initialization
        init();

				function init() {
					var route = $scope.curRoute = $scope.route || '';
					Noticer.on(route, noticeHandler);
					getPendingNotifications();
				}

        function getPendingNotifications() {
					var unread = Noticer.getUnread($scope.curRoute);
					_.each(unread, function(notice) {
						$scope.notifications.push(notice);
					});
        }

				function noticeHandler(notification) {
					$scope.notifications.push(notification);
				}

				function scopeDestroyHandler() {
					Noticer.off($scope.curRoute, noticeHandler);
				}

				$scope.$on('$destroy', scopeDestroyHandler);
			}],

			link: function($scope, $element) {
			}
		}
	}

})(angular, angular.module('noticer'));