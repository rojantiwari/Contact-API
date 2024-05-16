const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
// const router = require("./routes/contactRoutes")
// const dotenv = require('dotenv').config({path: `${__dirname}/../../config.env` });
connectDb();
const app = express();

// const port = process.env.PORT || 4001;
const port = 4001;

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
