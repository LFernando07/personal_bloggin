import { React } from "react";
import { useCategories } from "../../hooks/globalContext/CategoryProvider";
import { Category } from "./Category";
import '../../style/CategoryBar.css';
import { NotesProvider } from "../../hooks/globalContext/NotesProvider";

export const CategoryBar = () => {
  // Extraemos el contexto de las categorías data || vacio

  const { categories } = useCategories();

  return (
    <NotesProvider>
      <nav className="category-bar">
        {categories.map((category) => (
          <Category key={category.id} id={category.id} name={category.name} />

        ))}
        <div className="animation"></div>
      </nav>
    </NotesProvider>
  );
}
