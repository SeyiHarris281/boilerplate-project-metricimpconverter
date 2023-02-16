'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app
    .route('/api/convert')
    .get((req, res) => {
      let input = req.query.input;
      let initNum = convertHandler.getNum(input),
        initUnit = convertHandler.getUnit(input),
        returnNum = convertHandler.convert(initNum, initUnit),
        returnUnit = convertHandler.getReturnUnit(initUnit),
        string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      let resObj;
      
      console.log(`string: ${string}`);

      switch (string) {
        case 'invalid number':
        case 'invalid unit':
        case 'invalid number and unit':
          res.send(string);
          break;
        default:
          resObj = {
            initNum,
            initUnit,
            returnNum,
            returnUnit,
            string
          }
          res.json(resObj);
      }
    });

};
