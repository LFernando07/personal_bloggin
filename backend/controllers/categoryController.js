// Importar las dependencias necesarias de prisma
import { PrismaClient } from '@prisma/client';
import { CategoryValidations } from '../common/validations/category/categoryValidations.js';
import { handleException } from '../common/handle_request.js';
// Crear una instancia de PrismaClient
const prisma = new PrismaClient();

export class CategoryController {
  static createCategory = handleException(async (req, res) => {
    // Validations -> body
    const validate = await CategoryValidations.validateCategoryName(req.body.name);
    if (!validate.valid) return res.status(validate.error.status).json({ error: validate.error.message });

    // Create a new category
    const newCategory = await prisma.category.create({
      // Specify the model and the data to be created
      data: {
        name: req.body.name,
      }
    })
    // Return the new category
    return res.status(201).json(newCategory);
  })

  static getCategorys = handleException(async (req, res) => {
    // Get all categories
    const categories = await prisma.category.findMany(
      {
        orderBy: {
          id: 'asc'
        }
      }
    );

    // Return the categories
    return res.status(200).json(categories);
  })

  static getCategoryById = handleException(async (req, res) => {
    //Validations -> params
    const validate = await CategoryValidations.validateCategoryId(req.params.id);
    if (!validate.valid) return res.status(validate.error.status).json({ error: validate.error.message });

    // Get the category by id
    const category = await prisma.category.findUnique({
      where: {
        id: parseInt(req.params.id)
      }
    });

    // Return the category
    res.status(200).json(category);
  })

  static getCategoryWithAllNotes = handleException(async (req, res) => {
    //Validations -> params
    const validate = await CategoryValidations.validateCategoryId(req.params.id);
    if (!validate.valid) return res.status(validate.error.status).json({ error: validate.error.message });

    // Get the category with all notes
    const category = await prisma.category.findUnique({
      where: {
        id: parseInt(req.params.id)
      },
      include: {
        posts: {
          orderBy: {
            id: 'asc'
          }
        }
      }
    });

    // Return the category
    res.status(200).json(category);
  })

  static updateCategory = handleException(async (req, res) => {
    // VAlidations
    // Validate if id is in BD
    const idValidate = await CategoryValidations.validateCategoryId(req.params.id);
    if (!idValidate.valid) return res.status(idValidate.error.status).json({ error: idValidate.error.message });

    // Validate name exists in body
    const nameValidation = await CategoryValidations.validateCategoryName(req.body.name)
    if (!nameValidation.valid && !nameValidation.error.status !== 409) return res.status(nameValidation.error.status).json({ error: nameValidation.error.message });

    // Update the category
    const newCategory = await prisma.category.update({
      where: {
        id: parseInt(req.params.id)
      },
      data: {
        name: req.body.name
      }
    });

    // Return the category
    return res.status(200).json(newCategory);
  })

  static deleteCategory = handleException(async (req, res) => {
    //Validations -> params
    const validate = await CategoryValidations.validateCategoryId(req.params.id);
    if (!validate.valid) return res.status(validate.error.status).json({ error: validate.error.message });

    // Delete the category
    await prisma.category.delete({
      where: {
        id: parseInt(req.params.id)
      }
    });

    res.status(204).send();
  })

}