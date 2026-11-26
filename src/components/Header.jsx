import { Link, useNavigate } from 'react-router-dom'
import { obtenerUsuarioActual, esAdmin, cerrarSesion } from '../services/api'

function Header({ cantidadCarrito }) {
  const navigate = useNavigate()
  const usuario = obtenerUsuarioActual()

  const handleLogout = () => {
    cerrarSesion()
    navigate('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm mb-4">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4" to="/">NutriVida</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/productos">Productos</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/nosotros">Nosotros</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/blog">Blog</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contacto">Contacto</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/categorias">Categorías</Link></li>
          </ul>
          <div className="d-flex gap-2 align-items-center">
            {usuario ? (
              <>
                <span className="text-white small me-1">
                  Hola, <strong>{usuario.nombre}</strong>
                </span>
                {esAdmin() && (
                  <Link to="/admin" className="btn btn-dark btn-sm fw-bold">
                    Panel Admin
                  </Link>
                )}
                <button onClick={handleLogout} className="btn btn-outline-light btn-sm">
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-light btn-sm">Iniciar Sesión</Link>
                <Link to="/registro" className="btn btn-light btn-sm text-primary fw-bold">Registrarse</Link>
              </>
            )}
            <Link to="/carrito" className="btn btn-warning btn-sm fw-bold">
              🛒 Cart ({cantidadCarrito})
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header