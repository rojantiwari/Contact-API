const mongoose = require("mongoose");

const CONNECTION_STRING =
  "mongodb+srv://admin:admin@rojancluster.a5ykuht.mongodb.net/mycontacts-backend?retryWrites=true&w=majority&appName=rojancluster";
const connectDb = async (req, res) => {
  try {
    const connect = await mongoose.connect(CONNECTION_STRING);
    console.log(
      "Database connected",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;
