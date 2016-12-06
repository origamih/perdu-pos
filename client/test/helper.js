require('ignore-styles');
require('babel-core/register')({
  ignore: /node_modules/
}); 
require('isomorphic-fetch');
global.expect = require('chai').expect;

// var jsdom = require("jsdom");
// global.document = jsdom.jsdom("hello world");
// global.window = document.defaultView;
// global.navigator = {
//   userAgent: 'node.js'
// };

// jsdom.changeURL(window, "https://localhost/");

