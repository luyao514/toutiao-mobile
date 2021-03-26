module.exports = {
  plugins: {
    /* 'autoprefixer': {
      browsers: ['Android >= 4.0', 'iOS >= 8']
    }, */
    'postcss-pxtorem': {
      rootValue ({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75 // 如果是vant的css文件，就设置基准值为37.5px，否则设置为75px
      },
      propList: ['*']
    }
  }
}
