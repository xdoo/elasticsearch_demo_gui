
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
module.exports = {
  plugins: [
    new VuetifyLoaderPlugin()
  ]
}

// or vue.config.js
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
module.exports = {
  configureWebpack: {
    plugins: [
      new VuetifyLoaderPlugin()
    ]
  }
}