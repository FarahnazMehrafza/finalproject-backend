import { Schema, model } from "mongoose";

const recipeSchema = new Schema({
  name: {
    type: String,
    required: [true, "Text required!"],
    maxlength: 100,
  },
  introduction: {
    type: String,
    required: true,
    maxlength: 500,
  },
  preparationTime: {
    type: Number,
    required: true,
  },
  servings: {
    type: Number,
    required: false,
    maxlength: 50,
  },
  image: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: String,
        required: true,
        maxlength: 50,
      },
    },
  ],
  instructions: [
    {
      type: String,
      required: true,
    },
  ],
  difficulty: {
    type: String,
    enum: ["easy", "medium", "difficult"],
    default: "easy",
    required: true,
  },
  tags: {
    type: String,
    required: false,
    maxlength: 50,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  mealPlan: {
    type: Schema.Types.ObjectId,
    ref: "MealPlan",
    required: false,
  },
  category: {
    type: String,
    enum: [
      "Vegetarian",
      "Gluten-Free",
      "High-Protein",
      "Quick-and-Easy",
      "Desserts",
    ],
    default: "Main-Course",
    required: true,
  },
  // cookingAdditionalInformation: {
  //     nutritionalFacts: [{
  //         name: {
  //             type: String,
  //             required: false,
  //         },
  //         value: {
  //             type: String,
  //             required: false,
  //         },
  //       }],
  //     chefsTips: {
  //         type: String,
  //         required: false,
  //     },
  //     pairingSuggestions: [{
  //       text: {
  //         type: String,
  //         required: false,
  //       },
  //       image: {
  //         type: String,
  //         required: false,
  //       },
  //     }],
  //   },
});

export default model("Recipe", recipeSchema);
