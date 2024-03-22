import mongoose, { Schema, Document } from "mongoose";
import MealPlan from "./mealPlanModel";
import Recipe from "./recipeModel";

export interface User extends Document {
  name: string;
  email: string;
  accountName: string;
  imageURL: string;
  favoriteRecipes: (typeof Recipe)[];
  uploadedRecipes: (typeof Recipe)[];
  userMealPlan: (typeof MealPlan)[];
}

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  accountName: { type: String, required: true, unique: true },
  imageURL: { type: String, required: false },
  favoriteRecipes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
    },
  ],
  uploadedRecipes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
    },
  ],
  userMealPlan: [
    {
      type: Schema.Types.ObjectId,
      ref: "MealPlan",
    },
  ],

  // // mealPlan: [mealPlanModel],
});

export default mongoose.model<User>("User", userSchema);
