import mongoose from "mongoose";
import app from "./app.js";

const { DB_HOST, PORT = 3000 } = process.env;
console.log(DB_HOST);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Success connection to database");
    app.listen(PORT, () => {
      console.log(`Server is running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
