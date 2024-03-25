import express from "express";

import {
  getAllUsers,
  addUser,
  getUser,
  getUserMealPlan,
  getMealPlanById,
  updateMealPlan,
  // deleteMeal,
  addRecipeToDate,
} from "../controllers/userController";

const router = express.Router();

router.route("/").get(getAllUsers).post(addUser);

router.route("/:id").get(getUser).patch(updateUser);

// router.route("/:id/mealplan").get(getUserMealPlan);

// router.route("/:id/mealplan/addrecipe").post(addRecipeToDate);

// router.route("/:id/mealplan/:id").get(getMealPlanById).put(updateMealPlan);

export default router;
