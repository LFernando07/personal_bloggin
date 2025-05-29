import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { styled } from '@mui/material/styles';
import { apiService } from '../../service/api';
import '../../style/NoteFormCreated.css';
import Swal from 'sweetalert2'
import { useNotes } from '../../hooks/globalContext/NotesProvider';

const StyledAppBar = styled(AppBar)(() => ({
  position: 'relative',
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  flex: 1,
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ id }) {
  // Estados y eventos del dialog
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //Contexto de las Notas
  const { fetchNotes } = useNotes(); // Usar el contexto
  // Estados y propiedades del formulario
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");


  //Funcion del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log({ title, content, categoryId: id });
    //Convertir los datos obtenidos a un cuerpo compatible con la API
    const data = {
      title: title.trim(),
      content: content.trim(),
      categoryId: Number(id)
    }
    //Crear notas
    try {
      await apiService.createPost(data);

      //Recargar las notas desde la API con el contexto
      fetchNotes();


      //Limpiar campos
      setTitle("");
      setContent("");

      // Cierra el dialog
      handleClose()

      // Mostrar alerta de éxito
      Swal.fire({
        title: "Bien Hecho!",
        text: "Nota creada exitosamente!",
        icon: "success"
      });
    } catch (error) {
      console.error("Error al crear nota:", error);
      Swal.fire("Error", "No se pudo crear la nota", "error");
    }
  };

  return (
    <div >
      <Button variant="contained" size='large' color="secondary" onClick={handleClickOpen}>
        Agregar Nota
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <StyledAppBar>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <StyledTitle variant="h6">
              Nota nueva
            </StyledTitle>
          </Toolbar>
        </StyledAppBar>
        {/* Contenido del formulario */}
        <form className='note-form' onSubmit={handleSubmit}>
          <input
            className='note-form-title'
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Título"
            required
          />
          <textarea
            className='note-form-content'
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Contenido"
          />
          <button type="submit">Crear Nota</button>
        </form>
      </Dialog>
    </div>
  );
}