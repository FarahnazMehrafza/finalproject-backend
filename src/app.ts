import express from "express";

// import commentRouter from "./routes/commentRoutes";
// import mealPlanRouter from "./routes/mealRoutes";
// import userRouter from "./routes/userRoutes";

const app = express();

//MIDDLEWARE
app.use(express.json({ limit: "10kb" }));
// Url Encoder, Allows express to parse data being sent from a form
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//   })
// );

// var allowlist = [
//   "http://localhost:5173",
//   "https://my-product-inventory.vercel.app",
// ];
// var corsOptionsDelegate = function (req: any, callback: any) {
//   var corsOptions;
//   if (allowlist.indexOf(req.header("Origin")) !== -1) {
//     corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions = { origin: false }; // disable CORS for this request
//   }
//   callback(null, corsOptions); // callback expects two parameters: error and options
// };
// app.use(cors(corsOptionsDelegate));

// ROUTES
app.get("/", (req, res) => {
  res.status(200).send("Welcome to Our Express Server!!!!");
});

// app.use("/comment", commentRouter);
// // app.use("/mealPlan", mealPlanRouter);
// app.use("/user", userRouter);

// app.use((req, res) => {
//   res.status(404).send("Not Found");
// });

export default app;
