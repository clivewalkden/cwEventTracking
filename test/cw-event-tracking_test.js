(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  module('CWEventTracking', {
    // This will run before each test in this module.
    setup: function() {
      this.elems = $('#qunit-fixture > a');

      this.elems.CWEventTracking({
        isClicked: function(){
          ok(true,'Element Clicked');
          start();
        }
      });
    }
  });

  test('is chainable', function() {
    expect(1);
    // Not a bad test to run on collection methods.
    strictEqual(this.elems.CWEventTracking(), this.elems, 'should be chainable');
  });

  test('analytics check', function() {
    expect(1);
    stop();
  
    this.elems.CWEventTracking({
      isActive: function(){
        ok(true,'Analytics is available');
        start();
      },
      isInactive: function(){
        ok(false,'Analytics is not available');
        start();
      }
    });
  });

  test('link is clicked', function() {
    expect(1);
    stop();

    $('#qunit-fixture > a').eq(1).trigger('click');
  });

}(jQuery));
