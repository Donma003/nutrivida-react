import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiFetch, obtenerUsuarioActual } from '../services/api'

function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [mostrarForm, setMostrarForm] = useState(false)
  const [editandoId, setEditandoId] = useState(null)
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    password: '',
    rol: 'CLIENTE'
  })

  const usuarioActual = obtenerUsuarioActual()

  const cargarUsuarios = async () => {
    try {
      const data = await apiFetch('/usuarios')
      setUsuarios(data)
    } catch (err) {
      setError(err.message || 'No se pudieron cargar los usuarios.')
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargarUsuarios()
  }, [])

  const abrirNuevo = () => {
    setEditandoId(null)
    setForm({ nombre: '', correo: '', password: '', rol: 'CLIENTE' })
    setMostrarForm(true)
  }

  const abrirEditar = (usu) => {
    setEditandoId(usu.id)
    setForm({
      nombre: usu.nombre || '',
      correo: usu.correo || '',
      password: '',
      rol: usu.rol || 'CLIENTE'
    })
    setMostrarForm(true)
  }

  const handleGuardar = async (e) => {
    e.preventDefault()
    setError('')

    try {
      if (editandoId) {
        const payload = {
          nombre: form.nombre,
          correo: form.correo,
          rol: form.rol,
          ...(form.password.trim() !== '' && { password: form.password })
        }
        await apiFetch(`/usuarios/${editandoId}`, {
          method: 'PUT',
          body: JSON.stringify(payload)
        })
      } else {
        await apiFetch('/auth/register', {
          method: 'POST',
          body: JSON.stringify(form)
        })
      }
      setMostrarForm(false)
      cargarUsuarios()
    } catch (err) {
      setError(err.message || 'Error al guardar el usuario.')
    }
  }

  const handleEliminar = async (id, correo) => {
    if (usuarioActual?.correo === correo) {
      setError('No puedes eliminar tu propio usuario administrador mientras tienes la sesión activa.')
      return
    }
    if (!window.confirm(`¿Seguro que deseas eliminar al usuario ${correo}?`)) return

    try {
      await apiFetch(`/usuarios/${id}`, { method: 'DELETE' })
      cargarUsuarios()
    } catch (err) {
      setError(err.message || 'Error al eliminar el usuario.')
    }
  }

  return (
    <div className="row my-4">
      <div className="col-md-3">
        <div className="card shadow-sm h-100">
          <div className="card-body p-0">
            <h5 className="bg-dark text-white p-3 mb-0 rounded-top">⚙️ Panel Admin</h5>
            <div className="list-group list-group-flush">
              <Link to="/admin" className="list-group-item list-group-item-action">Dashboard</Link>
              <Link to="/admin/productos" className="list-group-item list-group-item-action">Mantenedor Productos</Link>
              <Link to="/admin/categorias" className="list-group-item list-group-item-action">Mantenedor Categorías</Link>
              <Link to="/admin/ordenes" className="list-group-item list-group-item-action">Órdenes / Boletas</Link>
              <Link to="/admin/usuarios" className="list-group-item list-group-item-action active">Mantenedor Usuarios</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-9">
        {error && <div className="alert alert-danger">{error}</div>}

        {mostrarForm && (
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary text-white fw-bold">
              {editandoId ? 'Editar Usuario' : 'Nuevo Usuario'}
            </div>
            <div className="card-body">
              <form onSubmit={handleGuardar}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Nombre completo</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={form.nombre}
                      onChange={e => setForm({ ...form, nombre: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Correo electrónico</label>
                    <input
                      type="email"
                      className="form-control"
                      required
                      value={form.correo}
                      onChange={e => setForm({ ...form, correo: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">
                      Contraseña {editandoId && <small className="text-muted">(dejar vacío para mantener)</small>}
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      required={!editandoId}
                      minLength="6"
                      value={form.password}
                      onChange={e => setForm({ ...form, password: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Rol</label>
                    <select
                      className="form-select"
                      value={form.rol}
                      onChange={e => setForm({ ...form, rol: e.target.value })}
                    >
                      <option value="CLIENTE">CLIENTE</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  </div>
                </div>
                <div className="mt-3 d-flex gap-2">
                  <button type="submit" className="btn btn-success">Guardar</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setMostrarForm(false)}>Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="card shadow-sm">
          <div className="card-header bg-white d-flex justify-content-between align-items-center">
            <h2 className="mb-0">Usuarios</h2>
            <button className="btn btn-dark" onClick={abrirNuevo}>NUEVO USUARIO</button>
          </div>
          <div className="card-body">
            {cargando ? (
              <p className="text-center text-muted my-3">Cargando usuarios...</p>
            ) : (
              <table className="table table-bordered table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map(usu => (
                    <tr key={usu.id}>
                      <td>{usu.id}</td>
                      <td>{usu.nombre}</td>
                      <td>{usu.correo}</td>
                      <td>
                        <span className={`badge ${usu.rol === 'ADMIN' ? 'bg-primary' : 'bg-secondary'}`}>
                          {usu.rol}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary me-2" onClick={() => abrirEditar(usu)}>
                          Editar
                        </button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleEliminar(usu.id, usu.correo)}>
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminUsuarios