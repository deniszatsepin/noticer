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

  var MAX_NOTICES_IN_QUEUE = 10;
  var MAX_NOTICES = 100;

	function NoticerDomRenderFactory($window, $document, $q) {
    var allNotifications = [];
		var notificationQueues = {};
		var subscribers = {};

		function notify(note, route, level) {
			route = route || '';
      level = level || 'info';

      var queue = notificationQueues[route] = notificationQueues[route] || [];

      var notification = {
        route: route,
        level: level,
        body: note,
        read: false
      };

      push(queue, notification);

      push(allNotifications, notification, MAX_NOTICES);

			emit(notification);
		}

    function push(queue, notification, max) {
      var MAX = max || MAX_NOTICES_IN_QUEUE;
      if (queue.length > MAX) {
        var removed = queue.shift();
        if (max) {
          var queue = notificationQueues[notification.route];
          if (queue) {
            _.remove(queue, function(el) {
              el === removed;
            });
          }
        } else {
          _.remove(allNotifications, function(el) {
            el === remove;
          });
        }
      }
      queue.push(notification);
    }

    function flush() {
      allNotifications.length = 0;
      var routes = Object.keys(notificationQueues);
      _.each(routes, function(route) {
        delete notificationQueues[route];
      });
    }

		function emit(notification) {
      var route = notification.route;
			var listeners = subscribers[route];
			if (_.isArray(listeners)) {
				_.each(listeners, function(listener) {
					if (typeof listener === 'function') {
            notification.read = true;
						listener.call(null, _.clone(notification));
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
			if (_.isArray(listeners)) {
				var idx = listeners.indexOf(callback);
				if (idx >= 0) {
					listeners.splice(idx, 1);
          if (listeners.length === 0) {
            delete subscribers[route];
          }
				}
			}
		}

    function getUnread(route) {
      route = route || '';
      var queue = notificationQueues[route];
      if (!queue.length) return [];

      return _.map(queue, function(notice) {
        if (!notice.read) {
          notice.read = true;
          return _.clone(notice);
        }
      });
    }

		return {
			notify: notify,
      flush: flush,
			on: subscribe,
			off: unsubscribe,
      getUnread: getUnread,
      _forTestsNotificationsQueues: notificationQueues,
      _forTestsAllNotifications: allNotifications,
      _forTestsSubscribers: subscribers
		};
	}


})(angular, angular.module('noticer'));
