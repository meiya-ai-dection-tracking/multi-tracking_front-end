module.exports = {
  devServer: {
    // host: 'localhost',
    // port: 8080,
    // proxy: {
    //   '/socket.io': {
    //     target: 'http://172.25.19.95:5000/socket.io',
    //     ws: true,
    //     changeOrigin: true
    //   },
    //   '/test': {
    //     target: 'http://172.25.19.95:5000/test',
    //     ws: true,
    //     changeOrigin: true
    //   },
    //   '/trackByImg': {
    //     target: 'http://172.25.19.95:5000/trackByImg',
    //     ws: true,
    //     changeOrigin: true
    //   }
    // },
    proxy: 'http://172.25.19.95:5000',
    // disableHostCheck: true,
  }
}
