import '../../style/NoteFormEdit.css';

export const NoteEditForm = ({ note, editTitle, setEditTitle, editContent, setEditContent, handleSave, handleCancel }) => {
  //Fragmento HTML
  return (
    <>
      <h1>Editando nota...</h1>
      <form className="edit-form"
        onSubmit={
          e => {
            e.preventDefault();
            handleSave(note.id)
          }
        }>
        <input
          className="edit-form-title"
          value={editTitle}
          onChange={e => setEditTitle(e.target.value)}
        />
        <textarea
          className="edit-form-content"
          value={editContent}
          onChange={e => setEditContent(e.target.value)}
        />
        <button className='submit'
          type="submit">
          Actualizar
        </button>
        <button className='cancel' onClick={handleCancel}>Cancelar</button>
      </form>
    </>
  );
}