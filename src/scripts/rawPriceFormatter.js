class RawPriceFormatter {

  constructor() {
    this.rawPrice;
    this.priceSelector = '.result .price';
    this.processedPrice;
  }

  init(){
    let that = this;
     this.getRawPrices().forEach(function(el, i){
      let processedPrice = that.processRawPrice(el.getAttribute('data-price'), el)
      that.insertFormattedPrice(processedPrice, el);
    });
  }

  getRawPrices(){
    let elements = document.querySelectorAll(this.priceSelector);
    return elements;
  }

  processRawPrice(rawPrice){
    let sLength = rawPrice.length;
    let processedPrice = '£';
    switch(sLength){
      // Thousands
      case 4:
        processedPrice += rawPrice.slice(0,1)+','+rawPrice.slice(1);
        break;
      // 10 thousands 
      case 5:
        processedPrice += rawPrice.slice(0,2)+','+rawPrice.slice(2);
        break;
      // 100 thousands
      case 6: 
        processedPrice += rawPrice.slice(0,3)+','+rawPrice.slice(3);
        break;
      // Millions
      case 7:
        processedPrice += rawPrice.slice(0,1)+','+rawPrice.slice(1,4)+','+rawPrice.slice(4);
        break; 
      // 10 Millions
      case 8:
        processedPrice += rawPrice.slice(0,2)+','+rawPrice.slice(2,5)+','+rawPrice.slice(5);
        break; 
    }
    return processedPrice;
  }

  insertFormattedPrice(processedPrice, el){
    el.insertAdjacentHTML('afterend', processedPrice);
  }

}

if(typeof exports !== 'undefined') {
  module.exports = RawPriceFormatter;
}
