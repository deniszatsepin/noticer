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

	it('should have an on method', function() {
		expect(service.on).toBeDefined();
		expect(typeof service.on).toEqual('function');
	});

	it('should have an off method', function() {
		expect(service.off).toBeDefined();
		expect(typeof service.off).toEqual('function');
	});
});
