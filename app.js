require('babel-core/register');
if (process.env.NODE_ENV === 'production') {
  require('./app.prod')
} else {
  require('./app.dev');
}
