import { useParams, useLocation, Link } from "react-router";
import '../style/CategoryPage.css';
import { useState } from "react";
import { apiService } from "../service/api";
import FullScreenDialog from "../components/note/NoteFormCreated";
import Swal from "sweetalert2";
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone';
import { ListOfNotes } from "../components/note/ListNotes";
import { useNotes } from "../hooks/globalContext/NotesProvider";
import { CategoryFormEdit } from "../components/category/CategoryFormEdit";

export const CategoryPage = () => {
  // Extraemos el id de la URL utilizando 
  // useParams de react-router
  const { id } = useParams();

  // Extraemos el nombre de la categoría del estado de la ubicación
  // location.state es el estado que pasamos al navegar a esta página
  const location = useLocation();
  const name = location.state?.name; // Puede ser undefined si el usuario recarga la página
  const [categoryName, setCategoryName] = useState(name || "");
  const { notes, fetchNotes } = useNotes() // Estado para almacenar las notas de la categoría
  // Extraccion de las notas de la categoría

  // EditCategoria
  const [editCategoriaId, setEditCagoriaId] = useState(null);
  const [editName, setEditName] = useState("");

  const handleEditNameClick = () => {
    setEditCagoriaId(id);
    setEditName(name || "");
  };

  const handleChangeName = (id) => {

    // Validar que el nombre no esté vacío
    if (editName.trim() === "") {
      // Mostrar alerta de éxito
      Swal.fire({ title: "Error!", text: "Llena el campo!", icon: "error" });
      return;
    }
    apiService.updateCategory(
      Number(id),
      {
        name: editName.trim()
      }
    );
    // Limpiamos el estado para no dejar activa una nota editada
    setEditCagoriaId(null);
    setCategoryName(editName.trim()); // Actualizamos el nombre de la categoría en el estado
    // Recarga las notas
    fetchNotes();
    // Mostrar alerta de éxito
    Swal.fire({ title: "Bien Hecho!", text: "Categoria modificada exitosamente!", icon: "success" });
  }

  const handleNameCancel = () => {
    setEditCagoriaId(null);
    setEditName("");
  };

  //Logica para editar ---------------------------------------------------------------------
  // Estado para manejar la edición de notas
  const [editNoteId, setEditNoteId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  // Función para iniciar la edición de una nota
  const handleEditClick = (note) => {
    setEditNoteId(note.id);
    setEditTitle(note.title || "");
    setEditContent(note.content || "");
  };

  // Función para guardar los cambios de la nota
  const handleSave = async (noteId) => {

    // Validar que los campos no estén vacíos
    if (editTitle.trim() === "" || editContent.trim() === "") {
      // Mostrar alerta de éxito
      Swal.fire({ title: "Error!", text: "Llena todos los campos!", icon: "error" });
      return;
    }
    await apiService.updatePost(
      Number(noteId),
      {
        title: editTitle.trim(),
        content: editContent.trim(),
        categoryId: Number(id)
      }
    );

    // Limpiamos el estado para no dejar activa una nota editada
    setEditNoteId(null);
    // Recarga las notas
    fetchNotes();

    // Mostrar alerta de éxito
    Swal.fire({ title: "Bien Hecho!", text: "Nota modificada exitosamente!", icon: "success" });
  };

  // Función para cancelar la edición
  const handleCancel = () => {
    setEditNoteId(null);
    setEditTitle("");
    setEditContent("");
  };

  // Logica para eliminar una nota----------------------------
  const [deleteNoteId, setDeleteNoteId] = useState(null);

  // Función para iniciar la edición de una nota
  const handleDeleteClick = (note) => {
    setDeleteNoteId(note.id);
  };

  // Funcion para eliminal completamente
  const handleDelete = async (note) => {
    // Generar modal
    Swal.fire({
      title: "Quieres eliminar esta nota?",
      text: "No podrás recuperarla después de eliminarla.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "SI, eliminar!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, eliminamos la nota
        await apiService.deletePost(note.id);
        // Limpiamos el estado para no dejar activa una nota editada
        setDeleteNoteId(null);
        // Recarga las notas
        fetchNotes();
        Swal.fire({
          title: "Eliminada!",
          text: "Tu nota ha sido eliminada exitosamente.",
          icon: "success"
        });
      }
    });
  }

  // Logica para mostrar todo el contenido de una nota
  const [expandedNoteId, setExpandedNoteId] = useState(null);

  const toggleExpandClick = (noteId) => {
    setExpandedNoteId(expandedNoteId === noteId ? null : noteId);
  };

  const isEditing = editCategoriaId === id;

  return (
    <div className="category-container">
      {/* Como referencia */}
      <h2 hidden>Categoría ID: {id}</h2>

      {/* Seccion del titulo y el boton */}
      <div className="category-header">
        <Link to="/" className="add-note">Volver</Link>

        {
          isEditing ? (
            <CategoryFormEdit id={id}
              editName={editName}
              setEditName={setEditName}
              handleChangeName={handleChangeName}
              handleCancel={handleNameCancel}
            />
          ) : (
            <div className="category-title">
              <h1>{categoryName ? categoryName : "Cargando nombre..."}</h1>
              <a
                className="icon-note"
                onClick={handleEditNameClick}
                title="Editar"
              >
                <ModeEditOutlineTwoToneIcon />
              </a>
            </div>

          )
        }
        <FullScreenDialog id={id} />
      </div>

      {/* Sección de las notas */}
      <div className="notes-section">
        {notes.length === 0 ? (
          <p> Categoria sin notas, agregue una nota en {name}</p>
        ) :
          <ListOfNotes
            notes={notes}
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            editContent={editContent}
            setEditContent={setEditContent}
            handleSave={handleSave}
            handleCancel={handleCancel}
            handleEditClick={handleEditClick}
            editNoteId={editNoteId}
            deleteNoteId={deleteNoteId}
            handleDeleteClick={handleDeleteClick}
            handleDelete={handleDelete}
            expandedNoteId={expandedNoteId}
            toggleExpandClick={toggleExpandClick}
          />
        }
      </div>
    </div >
  );
};