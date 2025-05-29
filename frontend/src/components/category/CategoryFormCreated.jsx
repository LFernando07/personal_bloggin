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
import '../../style/CategoryForm.css';
import { useCategories } from '../../hooks/globalContext/CategoryProvider';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

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

export default function CategoryForm() {
  const [open, setOpen] = React.useState(false);

  // Estados y propiedades del 
  // No olvidar el contexto global
  const { fetchCategories } = useCategories();

  const [nameCategory, setNameCategory] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setNameCategory("");
    setOpen(false);
  };

  //Funcion del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log({ title, content, categoryId: id });
    //Convertir los datos obtenidos a un cuerpo compatible con la API
    const data = {
      name: nameCategory.trim(),
    }
    //Crear notas
    await apiService.createCategory(data);
    // Actualizar lista de categorias
    fetchCategories();

    // Cierra el dialog
    handleClose()
  };


  return (
    <div >
      <Button variant="contained" size='medium' color="primary" onClick={handleClickOpen}>
        <AddCircleOutlineIcon />
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <StyledAppBar>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <StyledTitle variant="h6">
              Nueva Categoria
            </StyledTitle>
          </Toolbar>
        </StyledAppBar>
        {/* Contenido del formulario */}
        <form className='note-form' onSubmit={handleSubmit}>
          <input
            className='note-form-title'
            value={nameCategory}
            onChange={e => setNameCategory(e.target.value)}
            placeholder="Título"
            required
          />
          <button type="submit">Crear Categoria</button>
        </form>
      </Dialog>
    </div>
  );
}