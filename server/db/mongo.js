require('dotenv').config({ path: './.env' });

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const { MONGODB_USER, MONGODB_PSWD, MONGODB_NAME, MONGODB_URI } = process.env;
const mongoURL = `mongodb+srv://${MONGODB_USER}:${MONGODB_PSWD}@${MONGODB_URI}/${MONGODB_NAME}?retryWrites=true&w=majority`;

function connect() {
  mongoose.connection.once('open', () => {
    console.log('connected to database');
  });

  return mongoose.connect(mongoURL, {
    useNewUrlParser: true,
  });
}

module.exports = {
  connect,
};
