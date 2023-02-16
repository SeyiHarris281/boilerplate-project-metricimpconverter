const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  test('convertHandler should correctly read a whole number input', () => {
    assert.strictEqual(convertHandler.getNum('7mi'), 7);
  })
  test('convertHandler should correctly read a decimal number input', () => {
    assert.strictEqual(convertHandler.getNum('7.5mi'), 7.5);
  })
  test('convertHandler should correctly read a fractional input', () => {
    assert.strictEqual(convertHandler.getNum('1/2mi'), 0.5);
  })
  test('convertHandler should correctly read a fractional input with a decimal', () => {
    assert.strictEqual(convertHandler.getNum('2.5/2mi'), 1.25);
  })
  test('convertHandler should correctly return an error on a double-fracton (i.e. 3/2/3', () => {
    assert.strictEqual(convertHandler.getNum('3/2/3mi'), 'invalid number');
  })
  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', () => {
    assert.strictEqual(convertHandler.getNum('mi'), 1);
  })
  test('convertHandler should correctly read each valid input unit', () => {
    assert.strictEqual(convertHandler.getUnit('1gal'), 'gal');
    assert.strictEqual(convertHandler.getUnit('1l'), 'L');
    assert.strictEqual(convertHandler.getUnit('1lbs'), 'lbs');
    assert.strictEqual(convertHandler.getUnit('1kg'), 'kg');
    assert.strictEqual(convertHandler.getUnit('1mi'), 'mi');
    assert.strictEqual(convertHandler.getUnit('1km'), 'km');
  })
  test('convertHandler should correctly return an error for an invalid input unit', () => {
    assert.strictEqual(convertHandler.getUnit('1/2mm'), 'invalid unit');
  })
  test('convertHandler should return the correct return unit for each valid input unit', () => {
    assert.strictEqual(convertHandler.getReturnUnit('gal'), 'L');
    assert.strictEqual(convertHandler.getReturnUnit('L'), 'gal');
    assert.strictEqual(convertHandler.getReturnUnit('lbs'), 'kg');
    assert.strictEqual(convertHandler.getReturnUnit('kg'), 'lbs');
    assert.strictEqual(convertHandler.getReturnUnit('mi'), 'km');
    assert.strictEqual(convertHandler.getReturnUnit('km'), 'mi');
  })
  test('convertHandler should correctly return the spelled-out string unit for each valid input unit', () => {
    assert.strictEqual(convertHandler.spellOutUnit('gal'), 'gallons');
    assert.strictEqual(convertHandler.spellOutUnit('L'), 'liters');
    assert.strictEqual(convertHandler.spellOutUnit('lbs'), 'pounds');
    assert.strictEqual(convertHandler.spellOutUnit('kg'), 'kilograms');
    assert.strictEqual(convertHandler.spellOutUnit('mi'), 'miles');
    assert.strictEqual(convertHandler.spellOutUnit('km'), 'kilometers');
  })
  test('convertHandler should correctly convert gal to L', () => {
    assert.strictEqual(convertHandler.convert(1, 'gal'), 3.78541);
  });
  test('convertHandler should correctly convert L to gal', () => {
    assert.strictEqual(convertHandler.convert(1, 'L'), 0.26417);
  });
  test('convertHandler should correctly convert mi to km', () => {
    assert.strictEqual(convertHandler.convert(1, 'mi'), 1.60934);
  });
  test('convertHandler should correctly convert km to mi', () => {
    assert.strictEqual(convertHandler.convert(1, 'km'), 0.62137);
  });
  test('convertHandler should correctly convert lbs to kg', () => {
    assert.strictEqual(convertHandler.convert(1, 'lbs'), 0.45359);
  });
  test('convertHandler should correctly convert kg to lbs', () => {
    assert.strictEqual(convertHandler.convert(1, 'kg'), 2.20462);
  });
});