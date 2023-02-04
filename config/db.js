const mongoose = require("mongoose");

function connectDb() {
  const MONGO_DB_USERNAME = process.env.MONGO_DB_USERNAME;
  const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD;
  const MONGO_DB_URL = process.env.MONGO_DB_URL;
  mongoose
    .connect(
      `mongodb+srv://${MONGO_DB_USERNAME}:${MONGO_DB_PASSWORD}@${MONGO_DB_URL}/?retryWrites=true&w=majority`
    )
    .then(() => {
      console.log("mongobd connection is success");
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = connectDb;
