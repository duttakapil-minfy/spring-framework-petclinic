// Proxy configuration for http-server
module.exports = {
  '/api': {
    target: 'http://localhost:8080',
    secure: false,
    changeOrigin: true
  }
}; 