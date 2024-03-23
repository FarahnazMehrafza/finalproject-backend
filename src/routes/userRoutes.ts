import express from "express";

import {
  getAllUsers,
  addUser,
  getUser,
  getUserMealPlan,
  updateMeal,
  deleteMeal,
  addRecipeToDate,
} from "../controllers/userController";

const router = express.Router();

router.route("/").get(getAllUsers).post(addUser);

router.route("/:id").get(getUser);

router.route("/:id/mealplan").get(getUserMealPlan);

router.route("/:id/mealplan/addrecipe").post(addRecipeToDate);

router.route("/:id/mealplan/:id").put(updateMeal).delete(deleteMeal);

export default router;
