import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class PostValidations {
  static validatePostTitle = async (title) => {
    console.log('Validating post title:', title);
    if (title !== undefined && title.trim() === '') {
      return { valid: false, error: { status: 400, message: 'Title cannot be empty' } }
    }
    if (!title) {
      return { valid: false, error: { status: 422, message: 'Title is required' } };
    }
    // const exists = await prisma.post.findUnique({ where: { title } });
    // if (exists) {
    //   return { valid: false, error: { status: 409, message: `Post with title: ${title} already exists` } };
    // }

    return { valid: true };

  }

  static validatePostId = async (id) => {
    const post = await prisma.post.findUnique({ where: { id: parseInt(id) } });
    if (!post) {
      return { valid: false, error: { status: 404, message: 'Post id not found' } };
    }
    return { valid: true, post };
  }
}