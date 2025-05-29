import { Link } from "react-router";

export const Category = ({ id, name }) => {
  return (
    <>
      {/* // Enlace a la página de la categoría con el id y el nombre */}
      {/* // Se pasa el nombre como estado para mostrarlo en la página de la categoría */}
      <Link to={`/category/${id}`} state={{ name }}>
        {name}
      </Link>

    </>
  );
};