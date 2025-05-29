
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { NoteEditForm } from './NoteFormEdit';

export const ListOfNotes = ({ notes, editTitle, setEditTitle, editContent, setEditContent, handleSave, handleCancel, handleEditClick, editNoteId, deleteNoteId, handleDeleteClick, handleDelete, expandedNoteId,
  toggleExpandClick }) => {
  return (
    (
      notes.map(note => {
        // Formatear la fecha a un formato legible
        var fecha = new Date(note.updatedAt);
        fecha = fecha.toLocaleDateString("es-ES", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });

        const isEditing = editNoteId === note.id;
        return (
          <div className="note-item" key={note.id}>
            {isEditing ? (
              <NoteEditForm note={note} editTitle={editTitle} setEditTitle={setEditTitle} editContent={editContent} setEditContent={setEditContent} handleSave={handleSave} handleCancel={handleCancel}
              />
            ) : (
              <>
                <span className="note-title"><p>{note.title}</p></span>
                <p className={expandedNoteId === note.id ? "note-content-expand" : "note-content"} style={{ color: "#000" }}>{note.content}</p>
                <span className="note-date"><p className='date'>{`Modificado: ${fecha}`}</p></span>
                <div className="controls">
                  <a
                    className="icon-note"
                    onClick={() => toggleExpandClick(note.id)} title="Ver">
                    {expandedNoteId === note.id ? <VisibilityTwoToneIcon /> : <VisibilityOffIcon />}
                  </a>
                  <a
                    className="icon-note"
                    onClick={() => { handleEditClick(note) }}
                    title="Editar"
                  >
                    <ModeEditOutlineTwoToneIcon />
                  </a>
                  <a className="icon-note" onClick={() => {
                    handleDeleteClick(note)
                    if (deleteNoteId === note.id) {
                      handleDelete(note)
                    }
                  }
                  } title="Eliminar">
                    <DeleteOutlineTwoToneIcon />
                  </a>
                </div>
              </>
            )
            }
          </div>
        );
      })
    )
  )
}
