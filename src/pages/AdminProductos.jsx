import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiFetch } from '../services/api'

function AdminProductos() {
  const [productos, setProductos] = useState([])
  const [mostrarForm, setMostrarForm] = useState(false)
  const [editandoId, setEditandoId] = useState(null)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    codigo: '',
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    stockCritico: 5,
    categoria: 'Consulta',
    imagen: ''
  })

  const cargarProductos = async () => {
    try {
      const data = await apiFetch('/productos')
      setProductos(data)
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => {
    cargarProductos()
  }, [])

  const abrirNuevo = () => {
    setEditandoId(null)
    setForm({ codigo: '', nombre: '', descripcion: '', precio: '', stock: '', stockCritico: 5, categoria: 'Consulta', imagen: '' })
    setMostrarForm(true)
  }

  const abrirEditar = (prod) => {
    setEditandoId(prod.id)
    setForm({
      codigo: prod.codigo || '',
      nombre: prod.nombre || '',
      descripcion: prod.descripcion || '',
      precio: prod.precio || 0,
      stock: prod.stock || 0,
      stockCritico: prod.stockCritico || 5,
      categoria: prod.categoria || 'Consulta',
      imagen: prod.imagen || ''
    })
    setMostrarForm(true)
  }

  const handleGuardar = async (e) => {
    e.preventDefault()
    setError('')
    const payload = {
      ...form,
      precio: Number(form.precio),
      stock: Number(form.stock),
      stockCritico: Number(form.stockCritico)
    }

    try {
      if (editandoId) {
        await apiFetch(`/productos/${editandoId}`, { method: 'PUT', body: JSON.stringify(payload) })
      } else {
        await apiFetch('/productos', { method: 'POST', body: JSON.stringify(payload) })
      }
      setMostrarForm(false)
      cargarProductos()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este producto?')) return
    try {
      await apiFetch(`/productos/${id}`, { method: 'DELETE' })
      cargarProductos()
    } catch (err) {
      setError(err.message)
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
              <Link to="/admin/productos" className="list-group-item list-group-item-action active">Mantenedor Productos</Link>
              <Link to="/admin/categorias" className="list-group-item list-group-item-action">Mantenedor Categorías</Link>
              <Link to="/admin/ordenes" className="list-group-item list-group-item-action">Órdenes / Boletas</Link>
              <Link to="/admin/usuarios" className="list-group-item list-group-item-action">Mantenedor Usuarios</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-9">
        {error && <div className="alert alert-danger">{error}</div>}

        {mostrarForm && (
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary text-white fw-bold">
              {editandoId ? 'Editar Producto' : 'Nuevo Producto'}
            </div>
            <div className="card-body">
              <form onSubmit={handleGuardar}>
                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label">Código</label>
                    <input type="text" className="form-control" required value={form.codigo} onChange={e => setForm({ ...form, codigo: e.target.value })} />
                  </div>
                  <div className="col-md-8">
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-control" required value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Precio</label>
                    <input type="number" className="form-control" required value={form.precio} onChange={e => setForm({ ...form, precio: e.target.value })} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Stock</label>
                    <input type="number" className="form-control" required value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Categoría</label>
                    <input type="text" className="form-control" required value={form.categoria} onChange={e => setForm({ ...form, categoria: e.target.value })} />
                  </div>
                  <div className="col-12">
                    <label className="form-label">URL Imagen</label>
                    <input type="text" className="form-control" value={form.imagen} onChange={e => setForm({ ...form, imagen: e.target.value })} />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Descripción</label>
                    <textarea className="form-control" rows="2" value={form.descripcion} onChange={e => setForm({ ...form, descripcion: e.target.value })} />
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
            <h2 className="mb-0">Productos</h2>
            <button className="btn btn-dark" onClick={abrirNuevo}>NUEVO PRODUCTO</button>
          </div>
          <div className="card-body">
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map(prod => (
                  <tr key={prod.id}>
                    <td>{prod.codigo}</td>
                    <td>{prod.nombre}</td>
                    <td>${prod.precio?.toLocaleString('es-CL')}</td>
                    <td>
                      <span className={`badge ${prod.stock <= (prod.stockCritico || 5) ? 'bg-danger' : 'bg-success'}`}>
                        {prod.stock}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-2" onClick={() => abrirEditar(prod)}>Editar</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleEliminar(prod.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminProductos