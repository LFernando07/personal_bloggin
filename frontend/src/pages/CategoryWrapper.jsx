// src/pages/CategoryWrapper.jsx
import { useParams } from "react-router";
import { CategoryPage } from "./CategoryPage";
import { NotesProvider } from "../hooks/globalContext/NotesProvider";

export const CategoryWrapper = () => {
  const { id } = useParams();

  return (
    <NotesProvider id={id}>
      <CategoryPage />
    </NotesProvider>
  );
};
