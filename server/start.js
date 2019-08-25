if( 'undefined' === typeof process.env.NODE_ENV || 'development' === process.env.NODE_ENV) {
  console.log('You are in development! Setting up dotenv.');
  require('dotenv').config({ path: '.env' });
} else {
  console.log('You are in production!');
}


if(process.env.PORT){
  const app = require('./app');
  app.set('port', process.env.PORT || 9999);
  const server = app.listen(app.get('port'), () => {
    console.log(`Express running → PORT ${server.address().port}`);
  });
} else {
  console.log('PORT is not defined!');
}