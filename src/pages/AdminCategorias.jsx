import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiFetch } from '../services/api'

function AdminCategorias() {
  const [categorias, setCategorias] = useState([])
  const [nombre, setNombre] = useState('')
  const [editandoId, setEditandoId] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  const cargarCategorias = async () => {
    try {
      const data = await apiFetch('/categorias')
      setCategorias(data)
    } catch (err) {
      setError(err.message || 'No se pudieron cargar las categorías desde el servidor.')
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargarCategorias()
  }, [])

  const handleGuardar = async (e) => {
    e.preventDefault()
    if (!nombre.trim()) return
    setError('')

    const existe = categorias.some(
      (c) => c.nombre.toLowerCase() === nombre.trim().toLowerCase() && c.id !== editandoId
    )
    if (existe) {
      setError('Esta categoría ya existe en el sistema.')
      return
    }

    try {
      if (editandoId) {
        await apiFetch(`/categorias/${editandoId}`, {
          method: 'PUT',
          body: JSON.stringify({ nombre: nombre.trim() })
        })
      } else {
        await apiFetch('/categorias', {
          method: 'POST',
          body: JSON.stringify({ nombre: nombre.trim() })
        })
      }
      setNombre('')
      setEditandoId(null)
      cargarCategorias()
    } catch (err) {
      setError(err.message || 'Error al guardar la categoría.')
    }
  }

  const iniciarEdicion = (cat) => {
    setEditandoId(cat.id)
    setNombre(cat.nombre)
    setError('')
  }

  const cancelarEdicion = () => {
    setEditandoId(null)
    setNombre('')
    setError('')
  }

  const handleEliminar = async (cat) => {
    if (!window.confirm(`¿Estás seguro de eliminar la categoría "${cat.nombre}"?`)) return
    setError('')

    try {
      await apiFetch(`/categorias/${cat.id}`, { method: 'DELETE' })
      if (editandoId === cat.id) cancelarEdicion()
      cargarCategorias()
    } catch (err) {
      setError(err.message || 'Error al eliminar la categoría.')
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
          </ul>
          <hr />
          <Link to="/" className="btn btn-danger w-100 fw-bold">⬅ Volver a Tienda</Link>
        </div>

        {/* CONTENIDO CENTRAL: MANTENEDOR DE CATEGORÍAS */}
        <div className="col-md-9 col-lg-10 p-4 p-md-5 bg-light">
          <div className="mb-4">
            <h2 className="fw-bold mb-1">Mantenedor de Categorías</h2>
            <p className="text-muted">Crea, edita o elimina las categorías de tus servicios en PostgreSQL.</p>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="row g-4">
            {/* Formulario para Nueva / Editar Categoría */}
            <div className="col-md-4">
              <div className="card shadow-sm border-0 p-4">
                <h5 className="fw-bold mb-3">
                  {editandoId ? 'Editar Categoría' : 'Nueva Categoría'}
                </h5>
                <form onSubmit={handleGuardar}>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Nombre de la categoría</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ej: Suplementos"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      required
                    />
                  </div>
                  <div className="d-grid gap-2">
                    <button type="submit" className={`btn ${editandoId ? 'btn-success' : 'btn-primary'} fw-bold`}>
                      {editandoId ? 'Guardar Cambios' : '+ Agregar Categoría'}
                    </button>
                    {editandoId && (
                      <button type="button" className="btn btn-outline-secondary" onClick={cancelarEdicion}>
                        Cancelar
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Tabla de Categorías Existentes */}
            <div className="col-md-8">
              <div className="card shadow-sm border-0 p-4">
                <h5 className="fw-bold mb-3">Categorías Registradas ({categorias.length})</h5>
                {cargando ? (
                  <p className="text-center text-muted my-3">Cargando categorías...</p>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle">
                      <thead className="table-light">
                        <tr>
                          <th>ID</th>
                          <th>Nombre de la Categoría</th>
                          <th className="text-end">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categorias.map((cat) => (
                          <tr key={cat.id}>
                            <td className="text-muted">{cat.id}</td>
                            <td className="fw-semibold">{cat.nombre}</td>
                            <td className="text-end">
                              <button
                                className="btn btn-sm btn-outline-primary me-2"
                                onClick={() => iniciarEdicion(cat)}
                              >
                                Editar
                              </button>
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
                            <td colSpan="3" className="text-center text-muted py-4">
                              No hay categorías registradas en la base de datos.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminCategorias