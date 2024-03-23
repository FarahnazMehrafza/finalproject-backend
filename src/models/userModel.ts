import mongoose, { Schema, Document } from "mongoose";
import MealPlan from "./mealPlanModel";

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
});

userSchema.pre("save", async function (next) {
  if (this.isNew) {
    const mealPlan = new MealPlan({
      userId: this._id,
      meals: [],
    });
    await mealPlan.save();

    this.userMealPlan.push(mealPlan._id);
  }
  next();
});

export default mongoose.model("User", userSchema);
