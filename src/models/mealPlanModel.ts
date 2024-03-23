// import { Schema, model } from "mongoose";
// // import recipeModel from "./recipeModel";

// const mealPlanSchema = new Schema({
//   meals: [
//     {
//       date: {
//         type: Date,
//         required: true,
//       },
//       meal: {
//         type: String,
//         enum: ["breakfast", "lunch", "dinner", "snacks"],
//         default: "breakfast",
//         required: false,
//       },
//       recipe: {
//         type: Schema.Types.ObjectId,
//         ref: "Recipe",
//         required: true,
//       },
//     },
//   ],
//   userId: {
//     type: Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
// });

// export default model("MealPlan", mealPlanSchema);
import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  mealType: { type: String, required: true },
  recipe: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" },
});

const mealPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  meals: [mealSchema],
});

export default mongoose.model("MealPlan", mealPlanSchema);
