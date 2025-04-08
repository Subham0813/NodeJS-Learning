const mongoose = require("mongoose");

//Connection
async function connectMongoDB(url) {
  return mongoose.connect(url);
}

module.exports = {
  connectMongoDB
};
