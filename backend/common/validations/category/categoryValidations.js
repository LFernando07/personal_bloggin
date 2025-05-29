import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class CategoryValidations {
  static validateCategoryName = async (name) => {
    if (!name) {
      return { valid: false, error: { status: 422, message: 'Name is required' } };
    }
    const exists = await prisma.category.findUnique({ where: { name } });
    if (exists) {
      return { valid: false, error: { status: 409, message: `Category: ${name} already exists` } };
    }
    return { valid: true };
  }

  static validateCategoryId = async (id) => {
    const category = await prisma.category.findUnique({ where: { id: parseInt(id) } });
    if (!category) {
      return { valid: false, error: { status: 404, message: 'Category not found' } };
    }
    return { valid: true, category };
  }
}