import express from 'express';
import { createCategoryRoute } from './routers/categoryRoute.js';
import { createNoteRoute } from './routers/noteRoute.js';
import { corsMiddleware } from './middlewares/cors.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(corsMiddleware())

// Origin route showing the API is active
app.get('/', (req, res) => {
  res.send('Welcome to the personal blog API')
})

// Route for categories
app.use('/api/categories', createCategoryRoute());
// Route for posts
app.use('/api/posts', createNoteRoute());

app.listen(1234, () => {
  console.log('Server active in http://localhost:1234');
});