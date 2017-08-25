module.exports = {
  // other options...
    entry:{
      master: './components/master.vue',
      root: './components/root.vue',
      detail: './components/detail.vue',
      main: './main.js'
    }, 
output: {
    filename: '[name]Component.js',

  },

  module: {
    // module.rules is the same as module.loaders in 1.x
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          // `loaders` will overwrite the default loaders.
          // The following config will cause all <script> tags without "lang"
          // attribute to be loaded with coffee-loader
          loaders: {
            js: 'babel-loader'
          },
        }
      }
    ]
  }
}