import { Router } from "express";
import { NoteController } from "../controllers/noteControllers.js";

export const createNoteRoute = () => {
  const postRoute = Router();

  postRoute.post('/', NoteController.createPost);
  postRoute.get('/', NoteController.getPosts);
  postRoute.get('/:id', NoteController.getPostById);
  postRoute.put('/:id', NoteController.updatePost);
  postRoute.delete('/:id', NoteController.deletePost);

  return postRoute;
}