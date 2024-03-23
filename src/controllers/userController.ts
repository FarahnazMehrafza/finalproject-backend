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
    const data = await User.findById(req.params.id);

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
    const { id } = req.params;
    const { date, mealType, recipeId } = req.body;

    // Find the user and their meal plan
    const user = await User.findById(id);
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

    // Check if the meal already exists for the date and meal type
    const existingMeal = mealPlan.meals.find(
      (meal) => meal.date.toISOString() === date && meal.mealType === mealType
    );

    if (existingMeal) {
      // If the meal exists, update its recipe
      existingMeal.recipe = recipeId;
    } else {
      // If the meal does not exist, add a new meal with the recipe
      mealPlan.meals.push({ date, mealType, recipe: recipeId });
    }

    // Save the updated meal plan
    await mealPlan.save();

    res.status(200).json({
      status: "success",
      data: mealPlan,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "fail",
      message: "An error occurred while processing your request.",
    });
  }
};

// update a meal plan
export const updateMeal = async (req: Request, res: Response) => {
  try {
    const data = await MealPlan.findByIdAndUpdate(req.params.id, req.body, {
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

// delete a meal plan
export const deleteMeal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await MealPlan.findByIdAndDelete(id);
    res.status(204).json({
      status: "success",
      data,
    });
  } catch (err) {
    res.status(500).json({ message: "Error deleting entity" });
  }
};
