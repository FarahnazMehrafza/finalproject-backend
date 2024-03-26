import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.DATABASE, process.env.DATABASE_PASSWORD);
import app from "./app";

// ADD CONNECTION TO MONGODB
if (
  process.env.DATABASE === undefined ||
  process.env.DATABASE_PASSWORD === undefined
) {
  throw new Error("DATABASE environment variable(s) not set");
}

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

void mongoose.connect(DB);

mongoose.connection
  .on("open", () => {
    console.log("connected to mongo");
  })
  .on("close", () => {
    console.log("disconnected from mongo");
  })
  .on("error", (error) => {
    console.log("connection failed", error);
  });

// START THE SERVER
const PORT: string | number = process.env.PORT ?? 8000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
