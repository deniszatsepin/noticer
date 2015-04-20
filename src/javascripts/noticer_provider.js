
(function(angular, module) {

	module.provider('noticer.provider', $noticerProvider);

	/**
	 * Noticer provider.
	 */

	function $noticerProvider() {

		this.$get = ['$window', '$q', 'noticer.browser', 'noticer.dom', 'noticer.history'];

	}

})(angular, angular.module('noticer'));