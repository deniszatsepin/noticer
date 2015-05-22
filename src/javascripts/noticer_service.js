/**
 * Created by Denis Zatsepin <denis@zatsepin.spb.ru>
 * on 19.04.15.
 */

(function(angular, module) {

	module.provider('Noticer', $noticerDomRenderProvider);

	/**
	 * Noticer dome render provider.
	 */

	function $noticerDomRenderProvider() {

		this.$get = ['$window', '$document', '$q', NoticerDomRenderFactory];

	}

	function NoticerDomRenderFactory($window, $document, $q) {
		var notifications_queue = {
			'error': [],
			'warning': [],
			'info': []
		};
		var subscribers = {};

		function notify(note) {
			var notification = angular.extend({
				type: 'info',
				title: 'Info',
				body: 'Your notification should be here...'
			}, note);

			_emit(notification);
		}

		function _emit(notice) {
			var listeners = subscribers[route];
			if (angular.isArray(listeners)) {
				angular.forEach(listeners, function(listener) {
					if (typeof listener === 'function') {
						listener.call(null, notice);
					}
				});
			}
		}

		function subscribe(route, callback) {
			var listeners = subscribers[route] = subscribers[route] || [];
			var idx = listeners.indexOf(callback);
			if (idx < 0) {
				listeners.push(callback);
			}
		}

		function unsubscribe(route, callback) {
			var listeners = subscribers[route];
			if (angular.isArray(listeners)) {
				var idx = listeners.indexOf(callback);
				if (idx >= 0) {
					listeners.splice(idx, 1);
				}
			}
		}

		return {
			notify: notify,
			on: subscribe,
			off: unsubscribe
		};
	}


})(angular, angular.module('noticer'));
