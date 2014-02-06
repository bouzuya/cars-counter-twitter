var expect = require('chai').use(require('sinon-chai')).expect;
var counter = require('../');

describe('counter()', function() {
  it('works', function(done) {
    counter(function(err, counts) {
      expect(counts).to.have.a.property('Twitter Tweets');
      expect(counts).to.have.a.property('Twitter Following');
      expect(counts).to.have.a.property('Twitter Followers');
      expect(counts).to.have.a.property('Twitter Favorites');
      done();
    });
  });
});

