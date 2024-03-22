import { Schema, model } from "mongoose";
import recipeModel from "./recipeModel";

const mealPlanSchema = new Schema({
  title: {
    type: String,
    required: [true, "Text required!"],
    maxlength: 500,
  },
  notes: {
    type: String,
    required: true,
  },
  meals: [
    {
      name: {
        type: String,
        required: true,
      },
      date: {
        type: Date(),
        required: true,
      },
      meal: {
        type: String,
        enum: ["breakfast", "lunch", "dinner", "snacks"],
        default: "breakfast",
        required: false,
      },
      recipe: {
        type: String,
        required: true,
      },
    },
  ],
  recipes: [recipeModel],
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default model("MealPlan", mealPlanSchema);
