import Recipe from "../models/recipeModel";
import { Request, Response } from "express";
import MealPlan from "../models/mealPlanModel";

// /recipes GET: Get a list of all recipes.
export const getAllRecipes = async (req: Request, res: Response) => {
  try {
    const data = await Recipe.find();

    res.status(200).json({
      status: "success",
      results: data.length,
      data,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

// /recipes POST: Create a new recipe.
export const addRecipe = async (req: Request, res: Response) => {
  try {
    const data = await Recipe.create(req.body);
    res.status(201).json({
      status: "success",
      data,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

// /recipes/:id GET: Get details of a specific recipe.
export const getRecipe = async (req: Request, res: Response) => {
  try {
    const data = await Recipe.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

// /recipes/:id PUT: Update details of a specific recipe.
export const updateRecipe = async (req: Request, res: Response) => {
  try {
    const data = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!data) {
      return res.status(404).json({
        status: "fail",
        message: "Recipe not found",
      });
    }

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

// /recipes/:id DELETE: Delete a specific recipe.
export const deleteRecipe = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await Recipe.findByIdAndDelete(id);
    res.status(204).json({
      status: "success",
      data,
    });
  } catch (err) {
    res.status(500).json({ message: "Error deleting entity" });
  }
};

// /recipes/search?query= GET: Search for recipes by name or ingredients.
// export const searchRecipe = async (req: Request, res: Response) => {
//   try {
//     const query = req.query.query;
//     const results = await Recipe.find({
//       $or: [
//         { title: { $regex: query, $options: "i" } },
//         { "ingredients.name": { $regex: query, $options: "i" } },
//       ],
//     });

//     res.status(200).json({
//       status: "success",
//       results: results.length,
//       data: results,
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: "fail",
//       message: err,
//     });
//   }
// };

// // /recipes/category/:category GET: Retrieve recipes by category
// export const getRecipeByCategory = async (req: Request, res: Response) => {
//   try {
//     const category = req.params.category;
//     const data = await Recipe.find({ category: category });

//     res.status(200).json({
//       status: "success",
//       results: data.length,
//       data,
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: "fail",
//       message: err,
//     });
//   }
// };

// // /recipes/tag/:tag GET: Retrieve recipes by tag
// export const getRecipeByTag = async (req: Request, res: Response) => {
//   try {
//     const tag = req.params.tag;
//     const data = await Recipe.find({ tags: tag });

//     res.status(200).json({
//       status: "success",
//       results: data.length,
//       data,
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: "fail",
//       message: err,
//     });
//   }
// };

// */recipes/user/:userId GET: Retrieve recipes uploaded by a specific user.

// assignRecipeToMealPlan
export const addRecipeToDate = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { date, mealType, recipeId } = req.body;

    // Ensure the date is in the correct format
    const formattedDate = new Date(date);

    const mealPlan = await MealPlan.findOne({ userId });
    if (!mealPlan) {
      return res.status(404).json({
        status: "fail",
        message: "Meal plan not found",
      });
    }

    mealPlan.meals.push({ date: formattedDate, mealType, recipe: recipeId });
    await mealPlan.save();

    res.status(200).json({
      status: "success",
      message: "Recipe assigned to date successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "fail",
      message: "An error occurred while processing your request.",
    });
  }
};
