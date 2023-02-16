function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    //let chRegex = /^(\d*\.?\d*\/?\d*\.?\d*)([A-Za-z]+)$/;
    //let numRegex = /(\d*\.?\d*\/?\d*\.?\d*)/;

    let numRegex = /[0-9\.\+\-\/\*]/; // single digit check
    let numRegex2 = /^(\d*\.?\d*\/?\d*\.?\d*)$/; // whole number check
    let inputArray = input.split("");
    let numEntry = "";

    while (numRegex.test(inputArray[0])) {
      numEntry += inputArray.shift();
    }

    if (numEntry.length === 0) {
      result = 1;
    } else {
      if (numRegex2.test(numEntry)) {
        let numbers = numEntry.split('/');
        result = numbers.length === 1 ? +numbers[0] : numbers[0] / numbers[1];
      } else {
        result = "invalid number";
      }
    }
    
    /*
    if(chRegex.test(input)) {
      let numEntry = input.match(numRegex)[0];
      if (numEntry.length === 0) {
        result = 1;
      } else {
        let numbers = numEntry.split('/');
        result = numbers.length === 1 ? +numbers[0] : numbers[0] / numbers[1]
      }
    }
    */
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    /*let chRegex = /^(\d*\.?\d*\/?\d*\.?\d*)([A-Za-z]+)$/;
    let unitRegex = /([A-Za-z]+)/;

    if (chRegex.test(input)) {
      result = input.match(unitRegex);
    }

    if (result === 'l') result = "L";
    */
    let numRegex = /[0-9\.\+\-\/\*]/; // single digit check
    let unitRegex = /^(l|gal|kg|lbs|km|mi)$/i; // valid unit check
    let inputArray = input.split("");

    while (numRegex.test(inputArray[0])) {
      inputArray.shift();
    }

    let unit = inputArray.join("");

    result = unitRegex.test(unit) ? unit.toLowerCase() : "invalid unit";
    result = result === "l" ? "L" : result;
    
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    switch (initUnit.toLowerCase()) {
      case 'gal':
        result = "L";
        break;
      case 'l':
        result = 'gal';
        break;
      case 'lbs':
        result = 'kg';
        break;
      case 'kg':
        result = 'lbs';
        break;
      case 'mi':
        result = 'km';
        break;
      case 'km':
        result = 'mi';
        break;
      default:
        result = 'invalid unit'
    }
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    switch (unit.toLowerCase()) {
      case 'gal':
        result = "gallons";
        break;
      case 'l':
        result = 'liters';
        break;
      case 'lbs':
        result = 'pounds';
        break;
      case 'kg':
        result = 'kilograms';
        break;
      case 'mi':
        result = 'miles';
        break;
      case 'km':
        result = 'kilometers';
        break;
      default:
        result = 'invalid unit';
    }
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    if (initNum != 'invalid number' && initUnit != 'invalid unit') {
      switch (initUnit.toLowerCase()) {
        case 'gal':
          result = initNum * galToL;
          break;
        case 'l':
          result = initNum / galToL;
          break;
        case 'lbs':
          result = initNum * lbsToKg;
          break;
        case 'kg':
          result = initNum / lbsToKg;
          break;
        case 'mi':
          result = initNum * miToKm;
          break;
        case 'km':
          result = initNum / miToKm;
      }
      result = +result.toFixed(5);
    }
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
      
    if (initNum === 'invalid number' && initUnit === 'invalid unit') {
      result = "invalid number and unit";
    } else if (initNum === 'invalid number') {
      result = "invalid number";
    } else if (initUnit === 'invalid unit') {
      result = 'invalid unit';
    } else {
      result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    }
    
    return result;
  };
  
}

module.exports = ConvertHandler;
