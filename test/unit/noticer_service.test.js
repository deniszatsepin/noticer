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

	it('should add notice to the queue', function() {
		service.notify('hello');
		expect(service._forTestsAllNotifications.length).toBeGreaterThan(0);
		expect(service._forTestsNotificationsQueues['']).toBeDefined();
		expect(service._forTestsNotificationsQueues[''].length).toBeGreaterThan(0);
	});

	it('should remove all queues', function() {
    service.notify('hello');
		service.flush();
		expect(service._forTestsAllNotifications.length).toEqual(0);
	});

	it('should add notice to specified route', function() {
		var route = 'user/avatar';
		service.flush();
		service.notify('info', route);

		expect(service._forTestsNotificationsQueues[route]).toBeDefined();
		expect(service._forTestsNotificationsQueues[route].length).toBeGreaterThan(0);
	});

  function handler() {}
  it('should subscribe on notifications', function() {
    service.on('user/avatar', handler);

    expect(service._forTestsSubscribers['user/avatar']).toBeDefined();
    expect(service._forTestsSubscribers['user/avatar'].length).toBeGreaterThan(0);
  });

  it('should unsubscribe from notifications', function() {
    service.on('user/avatar', handler);
    service.off('user/avatar', handler);

    expect(service._forTestsSubscribers['user/avatar']).toBeUndefined();
  });

  it('should emit notification', function() {
    var handlers = {
      onLoaded: function() {}
    };

    spyOn(handlers, 'onLoaded');
    service.on('user/avatar', handlers.onLoaded);
    service.notify('loaded', 'user/avatar');

    expect(handlers.onLoaded).toHaveBeenCalled();
  });

});
