const mongoose = require('mongoose');
const env = require('../env/environment.prod');

mongoose.Promise = global.Promise;
const mongoURL = `${env.mongoURI}:${env.port}/${env.db}`;

function connect() {
  mongoose.connection.once('open', () => {
    console.log('connected to database');
  });

  return mongoose.connect(mongoURL, {
    // useMongoClient: true,
    useNewUrlParser: true,
    user: env.user,
    pass: env.pwd
  });
}


module.exports = {
  connect
};