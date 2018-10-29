const search = require('../src/scripts/search.js');
const processRawPrices = require('../src/scripts/rawPriceFormatter.js');
var assert = require('chai').assert;
var chai = require('chai');

describe('search', function () {
  it('should load an external valid JSON file.', function (done) {
    let searchInstance = new search();

    let p = new Promise(function (resolve, reject) {
      let searchInstance = new search('n11', resolve, reject);
      searchInstance.loadJSON('./test/data.json');
    });

    p.then((data) => {
      var checkJSON = function checkJSON(data) {
        try {
          var o = JSON.parse(jsonString);
          if (o && typeof o === "object") {
            return o;
          }
        } catch (e) {}

        return false;
      };
      assert.isOk(checkJSON)
      done();
    }, (error) => {
      assert.isOk(false, error);
    });


  });

  it('should find a match with postcode N11 as a search term', function(done) {
    
    let searchInstance = new search();

    let p = new Promise(function (resolve, reject) {
      let searchInstance = new search('n11', resolve, reject);
      searchInstance.init();
    });

    p.then((data) => {
      assert.exists(data, 'response is returned and thus a match for the search term is true');
      done();
    }, (error) => {
    });
  });

  it('should not find a match with postcode X11 as a search term', function() {
    
    let searchInstance = new search();

    return new Promise(function (resolve, reject) {
      let searchInstance = new search('X11', resolve, reject);
      searchInstance.init();
    })
    .then( (data) => {
      assert.equal(data, false, 'response is null and thus a match for the search term is false.');
    }, (error) => {
      assert.isNotOk(error,'Promise error');
    })
    .catch( (error) => {
      assert.isNotOk(error,'Promise error');
    })
  });
});

describe('results', function () {
  var processInstance = new processRawPrices();
  it('should format a raw price of 1000 properly', function() {
    let processedPrice = processInstance.processRawPrice('1000');
    assert.equal(processedPrice, '£1,000');
  });
  it('should format a raw price of 10000 properly', function() {
    let processedPrice = processInstance.processRawPrice('10000');
    assert.equal(processedPrice, '£10,000');
  });
  it('should format a raw price of 100000 properly', function() {
    let processedPrice = processInstance.processRawPrice('100000');
    assert.equal(processedPrice, '£100,000');
  });
  it('should format a raw price of 1000000 properly', function() {
    let processedPrice = processInstance.processRawPrice('1000000');
    assert.equal(processedPrice, '£1,000,000');
  });
  it('should format a raw price of 10000000 properly', function() {
    let processedPrice = processInstance.processRawPrice('10000000');
    assert.equal(processedPrice, '£10,000,000');
  });
});