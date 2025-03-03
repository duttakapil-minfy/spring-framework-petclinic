const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    ['/api', '/owners', '/pets', '/vets', '/visits'],
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
      secure: false,
      logLevel: 'debug',
      pathRewrite: function (path, req) {
        // If path already starts with /api, leave it as is
        if (path.startsWith('/api/')) {
          return path;
        }
        // Otherwise, prepend /api
        return `/api${path}`;
      },
      onProxyReq: (proxyReq, req, res) => {
        console.log('Proxy Request:', {
          path: req.path,
          method: req.method,
          targetUrl: proxyReq.path
        });
      },
      onProxyRes: (proxyRes, req, res) => {
        let responseBody = '';
        const originalWrite = res.write;
        const originalEnd = res.end;

        res.write = function (chunk) {
          responseBody += chunk;
          originalWrite.apply(res, arguments);
        };

        res.end = function () {
          try {
            const parsedBody = JSON.parse(responseBody);
            console.log('Response Data:', {
              path: req.path,
              status: proxyRes.statusCode,
              data: parsedBody
            });
          } catch (e) {
            console.log('Response (not JSON):', {
              path: req.path,
              status: proxyRes.statusCode,
              length: responseBody.length
            });
          }
          originalEnd.apply(res, arguments);
        };

        console.log('Proxy Response Headers:', {
          status: proxyRes.statusCode,
          path: req.path,
          method: req.method,
          contentType: proxyRes.headers['content-type']
        });
      },
      onError: (err, req, res) => {
        console.error('Proxy Error:', err);
        res.status(500).json({ error: 'Proxy Error', message: err.message });
      }
    })
  );
}; 