import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { obtenerProductos } from '../data/productosCRUD.js'

function AdminCategorias() {
  const [categorias, setCategorias] = useState([])
  const [nuevaCategoria, setNuevaCategoria] = useState('')

  // Cargar las categorías al iniciar
  useEffect(() => {
    // Revisar si ya hay categorías guardadas en la memoria del administrador
    const categoriasGuardadas = JSON.parse(localStorage.getItem('nutrivida_categorias_db'))
    
    if (categoriasGuardadas && categoriasGuardadas.length > 0) {
      setCategorias(categoriasGuardadas)
    } else {
      // Si no hay, se extrae automaticamente las que ya existen
      const productos = obtenerProductos()
      const unicas = [...new Set(productos.map(p => p.categoria))]
      setCategorias(unicas)
      localStorage.setItem('nutrivida_categorias_db', JSON.stringify(unicas))
    }
  }, [])

  // Función para crear una nueva categoría
  const handleAgregar = (e) => {
    e.preventDefault()
    if (!nuevaCategoria.trim()) return
    
    // Evitar duplicados
    if (categorias.includes(nuevaCategoria.trim())) {
      alert('Esta categoría ya existe en el sistema.')
      return
    }

    const listaActualizada = [...categorias, nuevaCategoria.trim()]
    setCategorias(listaActualizada)
    localStorage.setItem('nutrivida_categorias_db', JSON.stringify(listaActualizada))
    setNuevaCategoria('') // Limpiamos el formulario
  }

  // Función para eliminar una categoría
  const handleEliminar = (catAEliminar) => {
    if (window.confirm(`¿Estás seguro de eliminar la categoría "${catAEliminar}"?`)) {
      const listaActualizada = categorias.filter(c => c !== catAEliminar)
      setCategorias(listaActualizada)
      localStorage.setItem('nutrivida_categorias_db', JSON.stringify(listaActualizada))
    }
  }

  return (
    <div className="container-fluid" style={{ minHeight: '80vh' }}>
      <div className="row h-100">
        
        {/* MENÚ LATERAL VERTICAL */}
        <div className="col-md-3 col-lg-2 bg-dark text-white p-4 d-flex flex-column">
          <h4 className="fw-bold text-center mb-4 border-bottom pb-2">NutriVida Admin</h4>
          <ul className="nav nav-pills flex-column mb-auto gap-2">
            <li><Link to="/admin" className="nav-link text-white">📊 Dashboard</Link></li>
            <li><Link to="/admin/ordenes" className="nav-link text-white">🛒 Órdenes</Link></li>
            <li><Link to="/admin/productos" className="nav-link text-white">📦 Productos</Link></li>
            <li className="nav-item">
              <Link to="/admin/categorias" className="nav-link active fw-bold">📑 Categorías</Link>
            </li>
            <li><Link to="/admin/usuarios" className="nav-link text-white">👥 Usuarios</Link></li>
            <li><Link to="/admin/reportes" className="nav-link text-white">📈 Reportes</Link></li>
          </ul>
          <hr />
          <Link to="/" className="btn btn-danger w-100 fw-bold">⬅ Volver a Tienda</Link>
        </div>

        {/* CONTENIDO CENTRAL: MANTENEDOR DE CATEGORÍAS */}
        <div className="col-md-9 col-lg-10 p-4 p-md-5 bg-light">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="fw-bold mb-1">Mantenedor de Categorías</h2>
              <p className="text-muted">Crea, edita o elimina las categorías de tus servicios.</p>
            </div>
          </div>

          <div className="row g-4">
            {/* Formulario para Nueva Categoría */}
            <div className="col-md-4">
              <div className="card shadow-sm border-0 p-4">
                <h5 className="fw-bold mb-3">Nueva Categoría</h5>
                <form onSubmit={handleAgregar}>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Nombre de la categoría</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Ej: Suplementos" 
                      value={nuevaCategoria}
                      onChange={(e) => setNuevaCategoria(e.target.value)}
                      required 
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100 fw-bold">
                    + Agregar Categoría
                  </button>
                </form>
              </div>
            </div>

            {/* Tabla de Categorías Existentes */}
            <div className="col-md-8">
              <div className="card shadow-sm border-0 p-4">
                <h5 className="fw-bold mb-3">Categorías Registradas ({categorias.length})</h5>
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>Nombre de la Categoría</th>
                        <th className="text-end">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categorias.map((cat, index) => (
                        <tr key={index}>
                          <td className="text-muted">{index + 1}</td>
                          <td className="fw-semibold">{cat}</td>
                          <td className="text-end">
                            <button className="btn btn-sm btn-outline-secondary me-2">Editar</button>
                            <button 
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleEliminar(cat)}
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))}
                      {categorias.length === 0 && (
                        <tr>
                          <td colSpan="3" className="text-center text-muted py-4">No hay categorías registradas.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default AdminCategorias