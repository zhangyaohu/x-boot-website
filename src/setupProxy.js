const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/api', { 
       target: 'http://localhost:6666' ,
       secure: false,
       changeOrigin: true,
       pathRewrite: {
        "^/api": "/"
       }
    }));
};