/**
 * Created by Denis Zatsepin <denis@zatsepin.spb.ru>
 * on 20.04.15.
 */

describe('Noticer render unit tests', function() {

	var scope = {};
	var service = null;

	beforeEach(function() {
		module('noticer');
		inject(function(Noticer) {
			service = Noticer;
		});
	});

	it('should report a successful test', function() {
		expect(true).toBeTruthy();
	});

	it('should have notify method', function() {
		expect(service.notify).toBeDefined();
		expect(typeof service.notify).toEqual('function');
	});

	it('should have subscribe method', function() {
		expect(service.subscribe).toBeDefined();
		expect(typeof service.subscribe).toEqual('function');
	});

	it('should have notice method', function() {
		expect(service.unsubscribe).toBeDefined();
		expect(typeof service.unsubscribe).toEqual('function');
	});
});
