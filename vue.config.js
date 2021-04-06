const apiUrl = process.env.VUE_APP_API_URL

module.exports = {
  devServer: {
    proxy: {
      '^/api/v1': {
        target: apiUrl,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api/v1': ''
        }
      }
    }
  }
}
