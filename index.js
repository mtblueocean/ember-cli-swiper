/* jshint node:true */
'use strict';

const map = require('broccoli-stew').map;
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-cli-swiper',

  treeForVendor(defaultTree) {
    const app = this._findHost();
    const assetPath = process.env.PWD + '/' + app.bowerDirectory;

    let vendorLib = new Funnel(assetPath, { files: ['swiper/dist/js/swiper.min.js'] });
    vendorLib = map(vendorLib, (content) => `if (typeof FastBoot === 'undefined') { ${content} \n }`);

    return new mergeTrees([vendorLib]);
  },

  included(app) {
    this._super.included.apply(this, arguments);

    var app;

    // If the addon has the _findHost() method (in ember-cli >= 2.7.0), we'll just
    // use that.
    if (typeof this._findHost === 'function') {
      app = this._findHost();
    } else {
      // Otherwise, we'll use this implementation borrowed from the _findHost()
      // method in ember-cli.
      var current = this;
      do {
        app = current.app || app;
      } while (current.parent.parent && (current = current.parent));
    }

    app.import(app.bowerDirectory + '/swiper/dist/css/swiper.min.css');
    app.import('vendor/swiper/dist/js/swiper.min.js');
  }

};
