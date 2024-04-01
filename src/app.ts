import express from "express";
import cors from "cors";
import recipeRouter from "./routes/recipeRoutes";
import userRouter from "./routes/userRoutes";

const app = express();

// MIDDLEWARE
app.use(express.json({ limit: "10kb" }));
// Url Encoder, Allows express to parse data being sent from a form
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(
  cors({
    origin: ["http://localhost:5173", "https://yumyum-share.netlify.app"],
  })
);

// ROUTES
app.get("/", (req, res) => {
  res.status(200).send("Welcome to Our Express Server!!!!");
});

app.use("/recipe", recipeRouter);
app.use("/user", userRouter);

export default app;
