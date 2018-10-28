class RawPriceFormatter {

  constructor(rawPrice) {
    this.rawPrice = rawPrice;
    this.priceSelector = '.result .price';
    this.processedPrice;
  }

  getRawPrices(){
    var elements = document.querySelectorAll(this.priceSelector);
    let that = this;
    elements.forEach(function(el, i){
      that.processRawPrice(el.getAttribute('data-price'), el);
    });
  }

  processRawPrice(rawPrice, el){
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
        processedPrice += rawPrice.slice(0,1)+','+rawPrice.slice(1,4)+','+rawPrice.slice(4)
        break; 
      // 10 Millions
      case 8:
        processedPrice += rawPrice.slice(0,2)+','+rawPrice.slice(2,5)+','+rawPrice.slice(4,8)+','+rawPrice.slice(8);
        break; 
    }
    this.insertFormattedPrice(processedPrice, el);
  }

  insertFormattedPrice(processedPrice, el){
    el.insertAdjacentHTML('afterend', processedPrice);
  }

}

// module.exports = RawPriceFormatter;
var processRawPrices = new RawPriceFormatter;
processRawPrices.getRawPrices(); 