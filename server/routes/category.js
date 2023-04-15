import express from "express";
const router = express.Router();

// middleware
import { requireSignin, isAdmin } from "../middleware/index";
// controllers
import { create, categories } from "../controllers/category";

router.post("/category", requireSignin, isAdmin, create);

router.get('/categories',categories); 

export default router;
