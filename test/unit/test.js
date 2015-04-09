
describe('Noticer unit tests', function() {

	var scope = {};

	beforeEach(function() {
		module('noticer');
		inject(function($controller) {
			$controller('NoticerController', {$scope: scope});
		})
	});

	it('should report a successful test', function() {
		expect(true).toBeTruthy();
	});
});