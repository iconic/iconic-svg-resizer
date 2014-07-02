'use strict';

var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var builder = new xml2js.Builder();

module.exports = function svgResizer(data, dimensions, callback) {
  parser.parseString(data, function(err, result) {
    var attributes = result.svg.$;
    if (attributes) {
      if(dimensions.indexOf('x') !== -1 && attributes.width && attributes.height) {
        attributes.width = parseInt(attributes.width) * parseInt(dimensions) + 'px';
        attributes.height = parseInt(attributes.height) * parseInt(dimensions) + 'px';
      } else {
        attributes.width = parseInt(dimensions) + 'px';
        attributes.height = parseInt(dimensions) + 'px';
      }
    }

    callback(err, builder.buildObject(result));
  });
};