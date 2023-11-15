import "dotenv/config";
import express from "express";
import { contactRoute, userRouter } from "./routes/index.js";
import errorHandler from "./middleware/errorHandler.js";
import connectDb from "./config/dbConnection.js";

connectDb();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// adding route as middleware
app.use("/api/contact", contactRoute);
app.use("/api/user", userRouter);

// ERROR HANDLER - LAST MIDDLEWARE TO USE
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("listening on port: ", PORT);
});
