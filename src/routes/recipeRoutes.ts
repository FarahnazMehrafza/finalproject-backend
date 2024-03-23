import express from "express";

import {
  getAllRecipes,
  addRecipe,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  // searchRecipe,
  // getRecipeByCategory,
  // getRecipeByTag,
  addRecipeToDate,
} from "../controllers/recipeController";

const router = express.Router();

router.route("/").get(getAllRecipes).post(addRecipe);

router.route("/:id").get(getRecipe).put(updateRecipe).delete(deleteRecipe);

// router.get("/search", searchRecipe);

// router.get("/category/:category", getRecipeByCategory);

// router.get("/tag/:tag", getRecipeByTag);

router.route("/:id/add-recipe").post(addRecipeToDate);

export default router;
