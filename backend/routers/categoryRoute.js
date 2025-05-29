import { Router } from "express";
import { CategoryController } from "../controllers/categoryController.js";


export const createCategoryRoute = () => {
  const category = Router();

  category.post('/', CategoryController.createCategory);
  category.get('/', CategoryController.getCategorys);
  category.put('/:id', CategoryController.updateCategory);
  category.delete('/:id', CategoryController.deleteCategory);
  category.get('/:id', CategoryController.getCategoryById);
  category.get('/:id/notes', CategoryController.getCategoryWithAllNotes);

  return category;
};