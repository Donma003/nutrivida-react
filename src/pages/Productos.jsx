import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiFetch } from '../services/api'

function Productos({ onAgregar }) {
  const [productos, setProductos] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas')
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const cargarCatalogo = async () => {
      try {
        const data = await apiFetch('/productos')
        setProductos(data)
      } catch (err) {
        setError(err.message || 'No se pudo cargar el catálogo desde el servidor.')
      } finally {
        setCargando(false)
      }
    }
    cargarCatalogo()
  }, [])

  const categorias = ['Todas', ...new Set(productos.map((p) => p.categoria).filter(Boolean))]

  const productosFiltrados = productos.filter((p) => {
    const coincideTexto = p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                          (p.descripcion && p.descripcion.toLowerCase().includes(busqueda.toLowerCase()))
    const coincideCategoria = categoriaFiltro === 'Todas' || p.categoria === categoriaFiltro
    return coincideTexto && coincideCategoria
  })

  if (cargando) {
    return (
      <div className="container my-5 text-center">
        <h4>Cargando catálogo de servicios...</h4>
      </div>
    )
  }

  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold text-primary">Catálogo de Servicios y Planes</h2>
        <p className="text-muted">Selecciona el plan o atención nutricional que mejor se adapte a tus objetivos.</p>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Filtros de búsqueda y categoría */}
      <div className="row g-3 mb-4">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar servicio por nombre o descripción..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value)}
          >
            {categorias.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grilla de productos */}
      <div className="row g-4">
        {productosFiltrados.map((producto) => (
          <div key={producto.id} className="col-12 col-md-4 col-lg-3">
            <div className="card h-100 shadow-sm border-0">
              <img
                src={producto.imagen || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500'}
                className="card-img-top"
                alt={producto.nombre}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <span className="badge bg-info text-dark align-self-start mb-2">
                  {producto.categoria}
                </span>
                <h5 className="card-title fw-bold fs-6">{producto.nombre}</h5>
                <p className="card-text text-muted small flex-grow-1">
                  {producto.descripcion?.length > 80
                    ? `${producto.descripcion.slice(0, 80)}...`
                    : producto.descripcion}
                </p>

                <div className="mt-2">
                  <h4 className="text-primary fw-bold mb-1">
                    ${producto.precio?.toLocaleString('es-CL')}
                  </h4>
                  <small className={`d-block mb-3 ${producto.stock > 0 ? 'text-success' : 'text-danger'}`}>
                    {producto.stock > 0 ? `Stock disponible: ${producto.stock}` : 'Sin cupos disponibles'}
                  </small>

                  <button
                    onClick={() => onAgregar(producto)}
                    className="btn btn-warning fw-bold w-100 mb-2"
                    disabled={producto.stock <= 0}
                  >
                    {producto.stock > 0 ? 'Añadir al carrito' : 'Agotado'}
                  </button>
                  <Link to={`/producto/${producto.id}`} className="btn btn-outline-primary w-100">
                    Ver detalle
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {productosFiltrados.length === 0 && !error && (
          <div className="col-12 text-center text-muted my-5">
            <h5>No se encontraron servicios que coincidan con tu búsqueda.</h5>
          </div>
        )}
      </div>
    </div>
  )
}

export default Productos