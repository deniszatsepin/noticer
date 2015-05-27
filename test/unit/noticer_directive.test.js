
describe('Noticer directive', function() {

  var $compile, $rootScope;

  beforeEach(module('noticer.templates'));
  beforeEach(module('noticer'));




  beforeEach(module(function($provide) {
    $provide.provider('Noticer', function() {
      this.$get = function() {
        var notifications = [];
        return {
          on: function(route, handler) {

          },
          getUnread: function(route) {
            return _.map(notifications, function(note) {
              return note.read;
            });
          },
          notify: function(note, route, level) {

          }
        }
      }
    });
  }));

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('should render a notices container', function() {
    var tpl = '<div z-noticer></div>';
    var $parScope = $rootScope.$new();
    var $element = $compile(tpl)($parScope);

    $rootScope.$digest();
    expect($element.html()).toContain('z-notice');
  });

  it('should have a route attribute in the scope', function() {
    var tpl = '<div z-noticer noticer-route="user/avatar"></div>';
    var $parScope = $rootScope.$new();

    var $element = $compile(tpl)($parScope);
    $rootScope.$digest();
    var $scope = $element.isolateScope();

    expect($scope.route).toBeDefined();
    expect($scope.route).toEqual('user/avatar');
  });

  it('should have a level attribute in the scope', function() {
    var tpl = '<div z-noticer noticer-level="error"></div>';
    var $parScope = $rootScope.$new();

    var $element = $compile(tpl)($parScope);
    $rootScope.$digest();
    var $scope = $element.isolateScope();

    expect($scope.level).toBeDefined();
    expect($scope.level).toEqual('error');
  });
});