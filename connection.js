require("dotenv").config();

const mongoose = require("mongoose");

const connectionStr =
  "mongodb+srv://yuvarajmuthu:xPm6U93IAJ1onrj5@cluster0.8ufr6.mongodb.net/main_ecommerce?retryWrites=true&w=majority";

mongoose
  .connect(connectionStr, { useNewUrlparser: true })
  .then(() => console.log("connected to mongodb!!!"))
  .catch((err) => console.log(err));

mongoose.connection.on("error", (err) => {
  console.log(err);
});
