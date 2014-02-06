var expect = require('chai').use(require('sinon-chai')).expect;
var sinon = require('sinon');
var Counter = require('../lib/counter').Counter;

describe('Counter', function() {

  var counter;

  beforeEach(function(done) {
    counter = new Counter();
    done();
  });

  describe('count()', function() {
    it('works', function(done) {
      var username = 'bouzuya';
      var data = {};
      var fetch = sinon.stub(counter, 'fetch', function(username, callback) {
        callback(data);
      });
      var parse = sinon.stub(counter, 'parse', function(dataOrError) { return data; });
      counter.count(username, function(err, counts) {
        expect(err).to.be.null;
        expect(counts).to.not.be.null;
        expect(fetch).to.have.been.calledWith(username);
        expect(parse).to.have.been.calledWith(data);
        done();
      });
    });
  });

  describe('fetch()', function() {
    it('works [slow]', function(done) {
      var username = 'bouzuya';
      counter.fetch(username, function(dataOrError) {
        expect(dataOrError).to.not.be.null;
        done();
      });
    });
  });

  describe('parse()', function() {
    describe('when error', function() {
      it('throw Error', function(done) {
        expect(function() { counter.parse(new Error()); }).to.throw(Error);
        done();
      });
    });

    describe('when data', function() {
      it('return value', function(done) {
        var parsed = counter.parse({
          statuses_count: 1,
          friends_count: 2,
          followers_count: 3,
          favourites_count: 4
        });
        expect(parsed).to.have.a.property('Twitter Tweets', 1);
        expect(parsed).to.have.a.property('Twitter Following', 2);
        expect(parsed).to.have.a.property('Twitter Followers', 3);
        expect(parsed).to.have.a.property('Twitter Favorites', 4);
        done();
      });
    });
  });

});

