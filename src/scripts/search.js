 const fs = require('fs');

class Search {

  constructor(search, resolve, reject) {
    this.search = search;
    this.jsonFile = './dist/data.json';
    this.data = '';
    this.resolve = resolve;
    this.reject = reject;
  }

  init() {
    this.getData();
  }

  getData() {
    this.loadJSON(this.jsonFile);
  }

  loadJSON (file) {   
    fs.readFile(file, (err, data) => {  
      if (err) throw err;
      this.searchReturnedDataForUserQuery(JSON.parse(data));
    });
  }

  outputData() {
    console.log(this.data);
  }

  searchReturnedDataForUserQuery(data) {
    // console.log('data sent to fn is: ');
    // console.log(data);
    this.data = data;
    for (let x in data) {
      if ( x == 'area' ) {
        // console.log(`key= ${x} value = ${data[x]}`);
        let foundMatch = this.regexMatch(this.search);
        // console.log('match is: '+foundMatch);
        if (foundMatch >= 0) {
          this.returnData(this.data);
        }
        else {
          this.reject(false);
        }
      }
    }
  }

  regexMatch(str) {
    return str.search(/n11/i);
  }

  returnData(data) {
    // console.log('data to send');
    // console.log(data);
    this.resolve(data);
  }

}

module.exports = Search;