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
				route: '=noticerRoute',
				level: '=noticerLevel'
			},

			templateUrl: '/templates/notification.html',

			controller: ['$scope', function($scope) {
        _.assign($scope, {
          notifications: []
        });

        //Directive initialization
        init();

				function init() {
					if ($scope.route.length) {
						Noticer.on($scope.route.length, noticeHandler);
            getPendingNotifications();
					}
				}

        function getPendingNotifications() {

        }

				function noticeHandler(notification) {

				}

				function scopeDestroyHandler() {
					Noticer.off($scope.route.length, noticeHandler);
				}

				$scope.$on('$destroy', scopeDestroyHandler);
			}],

			link: function($scope, $element) {

			}
		}
	}

})(angular, angular.module('noticer'));