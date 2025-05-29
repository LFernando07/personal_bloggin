// Importar las dependencias necesarias de prisma
import { PrismaClient } from '@prisma/client';
import { handleException } from '../common/handle_request.js';
import { CategoryValidations } from '../common/validations/category/categoryValidations.js';
import { PostValidations } from '../common/validations/post/postValidations.js';

// Crear una instancia de PrismaClient
const prisma = new PrismaClient();

// Controlador para crear un nuevo post
export class NoteController {

  static createPost = handleException(async (req, res) => {
    // Validate the request body
    const validate = await PostValidations.validatePostTitle(req.body.title);
    if (!validate.valid) return res.status(validate.error.status).json({ error: validate.error.message });

    if (!req.body.categoryId) {
      return res.status(422).json({ error: 'Category ID is required' });
    } else {
      const validate = await CategoryValidations.validateCategoryId(req.body.categoryId);
      if (!validate.valid) return res.status(validate.error.status).json({ error: validate.error.message });

    }

    // create a new post
    const newPost = await prisma.post.create({
      data: req.body
    })

    return res.status(201).json(newPost);
  })

  static getPosts = handleException(async (req, res) => {
    const posts = await prisma.post.findMany({
      // Include the category information
      include: {
        category: {
          // Get not all columns from category tables
          select: {
            id: true,
            name: true
          }
        },
      },
      omit: {
        categoryId: true
      }
    })

    return res.status(200).json(posts);
  })

  static getPostById = handleException(async (req, res) => {
    // Validate the request params
    const validate = await PostValidations.validatePostId(req.params.id);
    if (!validate.valid) return res.status(validate.error.status).json({ error: validate.error.message });

    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(req.params.id)
      },
      include: {
        category: {
          select: {
            id: true,
            name: true
          }
        }
      },
      omit: {
        categoryId: true
      }
    })

    // return post 
    return res.status(200).json(post);
  })

  static updatePost = handleException(async (req, res) => {
    // Validate the request params
    const idvalidate = await PostValidations.validatePostId(req.params.id);
    if (!idvalidate.valid) return res.status(idvalidate.error.status).json({ error: idvalidate.error.message });

    // Validate the request body
    const titleValidate = await PostValidations.validatePostTitle(req.body.title);
    if (!titleValidate.valid && (!titleValidate.error.status !== 409 && !titleValidate.error.status !== 422)) return res.status(nameValidate.error.status).json({ error: nameValidate.error.message });

    if (!req.body.categoryId) {
      return res.status(422).json({ error: 'Category ID is required' });
    } else {
      const validate = await CategoryValidations.validateCategoryId(req.body.categoryId);
      if (!validate.valid) return res.status(validate.error.status).json({ error: validate.error.message });
    }

    // update a post
    const updatedPost = await prisma.post.update({
      data: req.body,
      where: {
        id: parseInt(req.params.id)
      },
      include: {
        category: {
          select: {
            id: true,
            name: true
          }
        }
      },
      omit: {
        categoryId: true
      }
    })

    return res.status(200).json(updatedPost);
  })

  static deletePost = handleException(async (req, res) => {
    // Validate the request params
    const idvalidate = await PostValidations.validatePostId(req.params.id);
    if (!idvalidate.valid) return res.status(idvalidate.error.status).json({ error: idvalidate.error.message });

    // Delete the category
    await prisma.post.delete({
      where: {
        id: parseInt(req.params.id)
      }
    });

    res.status(204).send();
  })


}