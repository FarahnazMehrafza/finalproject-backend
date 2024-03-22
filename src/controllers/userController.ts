import User from "../models/userModel";
import { Request, Response } from "express";

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

// create a new meal plan for the user

// retrieve meal plans associated with the user

// update a meal plan

// delete a meal plan
