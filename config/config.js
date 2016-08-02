const milieu = require('milieu');

const config = milieu('boilerplate-api', {
  environment: 'dev',
  server: {
    port: 3000
  },
  mongo: {
    url: 'mongodb://localhost/boilerplate-api'
  },
  secretKey: '12345-67890-09876-54321',
});


module.exports = config;
