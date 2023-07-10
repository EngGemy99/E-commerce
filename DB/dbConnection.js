import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnection = (app, port) => {
  mongoose
    .connect(
      "mongodb+srv://Ecommerce:ahmed123@cluster0.tg2uqgc.mongodb.net/ecommerce"
    )
    .then(() => {
      console.log("Connected successfully to server");
      app.listen(process.env.PORT || port, () =>
        console.log(`app listening on port ${port}!`)
      );
    })
    .catch((err) => console.log(err));
};

export { dbConnection };
