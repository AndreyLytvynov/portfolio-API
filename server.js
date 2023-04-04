const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", true);
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@movies.0twhwyt.mongodb.net/movie?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

app.listen(3002, () => {
  console.log("Server running. Use our API on port: 3002");
});
