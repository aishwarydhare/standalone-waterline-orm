var Waterline = require('waterline');
var baseModel = require('./baseModel');

let mModel = Object.assign({}, baseModel.defaultConfig,{
  identity: 'cities',

  // attributes:
  attributes: Object.assign({}, baseModel.defaultAttr,
    {
      name: { type: 'string'},
    }
  ),
});

module.exports = Waterline.Collection.extend(mModel);
