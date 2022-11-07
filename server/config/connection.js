const mongoose = require("mongoose");

const connection_str =
  process.env.MONGODB_URI || "mongodb://localhost/NIM-portal";

console.log({ connection_str });

mongoose.connect(
  connection_str,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // autoIndex: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  },
  (err) => {
    console.log(err);
  }
);

module.exports = mongoose.connection;
