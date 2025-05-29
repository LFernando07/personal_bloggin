import { createContext, useContext, useState, useEffect } from "react";
import { apiService } from "../../service/api.js";

// Crear contexto de cambio
const CategoryContext = createContext();

// Crear un hook para usar el contexto
export const useCategories = () => useContext(CategoryContext);


export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  // fetching de datos de la API para el cambio 
  const fetchCategories = () => {
    apiService.getCategories()
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories:", err));
  };

  // useEffect para llamar a fetchCategories una sola vez al montar el componente
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    // Proveer el contexto a los hijos
    // El valor del contexto es un objeto que contiene las categorías y la función para obtenerlas
    <CategoryContext.Provider value={{ categories, fetchCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};