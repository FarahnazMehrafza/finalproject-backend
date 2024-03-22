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
    required: false,
  },
  mealPlans: {
    type: Schema.Types.ObjectId,
    ref: "MealPlan",
    required: false,
  },
  category: {
    type: String,
    enum: [
      "Vegetarian",
      "Vegan",
      "Gluten-Free",
      "Dairy-Free",
      "Low-Carb",
      "High-Protein",
      "Low-Fat",
      "Quick-and-Easy",
      "Healthy",
      "Gourmet",
      "Keto",
      "Paleo",
      "Vegetable-Rich",
      "Grain-Free",
      "Sugar-Free",
      "Low-Sodium",
      "Low-Sugar",
      "High-Fiber",
      "Low-Calorie",
      "Gluten-Free",
      "Dairy-Free",
      "Desserts",
      "Desserts",
      "Breakfast",
      "Brunch",
      "Drinks",
      "Appetizer",
      "Main-Course",
      "Side-Dish",
      "Soup",
      "Salad",
      "Sandwich",
      "Snack",
      "Dip",
      "Sauce",
      "Bread",
      "Dessert",
      "Cocktail",
      "Smoothie",
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
