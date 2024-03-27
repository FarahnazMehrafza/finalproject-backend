import User from "../models/userModel";
import { Request, Response } from "express";
import MealPlan from "../models/mealPlanModel";

// /users GET: Get a list of all users.
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const data = await User.find();

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

// /users POST: Create a new user.
export const addUser = async (req: Request, res: Response) => {
  try {
    const data = await User.create(req.body);
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

// /users/:id GET: Get details of a specific user.
export const getUser = async (req: Request, res: Response) => {
  try {
    const data = await User.findById(req.params.id).populate(
      "uploadedRecipes favoriteRecipes"
    );
    console.log(data);

    if (!data) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "An error occurred while fetching the user",
    });
  }
};

// get recipe from user
export const getUserRecipes = async (req: Request, res: Response) => {
  try {
    const data = await User.findById(req.params.id).populate("uploadedRecipes");

    if (!data) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: data.uploadedRecipes,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "An error occurred while fetching the user's recipes",
    });
  }
};

// GET meal plans associated with the user
export const getUserMealPlan = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    const data = await MealPlan.findById(user.userMealPlan).populate(
      "meals.recipe"
    );

    if (!data) {
      return res.status(404).json({
        status: "fail",
        message: "Meal plan not found for the user",
      });
    }

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "An error occurred while fetching the meal plan",
    });
  }
};

// POST recipe to meal plan
export const addRecipeToDate = async (req: Request, res: Response) => {
  try {
    const { date, mealType, recipeId } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    const mealPlan = await MealPlan.findById(user.userMealPlan);
    if (!mealPlan) {
      return res.status(404).json({
        status: "fail",
        message: "Meal plan not found",
      });
    }

    mealPlan.meals.push({ date, mealType, recipe: recipeId });
    const updatedMealPlan = await mealPlan.save();

    res.status(200).json({
      status: "success",
      data: {
        mealPlan: updatedMealPlan,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

// get one mealplan
export const getMealPlanById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const mealPlan = await MealPlan.findById(id);

    if (!mealPlan) {
      return res.status(404).json({
        status: "fail",
        message: "Meal plan not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: mealPlan,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "An error occurred while fetching the meal plan",
    });
  }
};

// update a meal plan
export const updateMealPlan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const update = req.body;

    const updatedMealPlan = await MealPlan.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });

    if (!updatedMealPlan) {
      return res.status(404).json({
        status: "fail",
        message: "Meal plan not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: updatedMealPlan,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

// export const updateMeal = async (req: Request, res: Response) => {
//   try {
//     const data = await MealPlan.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });

//     if (!data) {
//       return res.status(404).json({
//         status: "fail",
//         message: "Recipe not found",
//       });
//     }

//     res.status(200).json({
//       status: "success",
//       data,
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: "fail",
//       message: err,
//     });
//   }
// };

// delete a meal plan
// export const deleteMeal = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const data = await MealPlan.findByIdAndDelete(id);
//     res.status(204).json({
//       status: "success",
//       data,
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Error deleting entity" });
//   }
// };
