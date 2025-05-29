import { createContext, useContext, useEffect, useState } from "react";
import { apiService } from "../../service/api";

// Crear un contexto de cambio
const NotesContext = createContext();

// Crear un hook para usar el contexto
export const useNotes = () => useContext(NotesContext);

export const NotesProvider = ({ id, children }) => {
  // state de la data
  const [notes, setNotes] = useState([]);

  //fetching de datos de la API para el cambio
  const fetchNotes = () => {
    apiService.getCategoryWithAllNotes(id)
      .then((res) => setNotes(res.data.posts))
      .catch((err) => console.error("Error fetching notes:", err));
  };

  useEffect(() => {
    if (id) fetchNotes();
  }, [id]);

  return (
    <NotesContext.Provider value={{ notes, fetchNotes }}>
      {children}
    </NotesContext.Provider>
  );
};