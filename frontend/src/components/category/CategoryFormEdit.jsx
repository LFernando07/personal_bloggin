import '../../style/CategoryFormEdit.css';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ClearIcon from '@mui/icons-material/Clear';

export const CategoryFormEdit = ({ id, editName, setEditName, handleChangeName, handleCancel }) => {
  return (
    <>
      <form className="edit-form"
        onSubmit={
          e => {
            e.preventDefault();
            handleChangeName(id)
          }
        }>
        <input
          className="edit-form-name"
          value={editName}
          onChange={e => setEditName(e.target.value)}
        />
        <button className='submit'
          type="submit">
          <DoneAllIcon className='icon' />
        </button>
        <button className='cancel' onClick={handleCancel}>
          <ClearIcon className='icon' />
        </button>
      </form>
    </>
  );
}