import express from "express";

import { getAllUsers, addUser, getUser } from "../controllers/userController";

const router = express.Router();

router.route("/").get(getAllUsers).post(addUser);

router.route("/:id").get(getUser);

router.route("/:id/savedrecipes").get();

router.route("/:id/savedrecipes").get();

export default router;
