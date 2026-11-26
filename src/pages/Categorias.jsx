import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiFetch } from '../services/api'

function Categorias({ onAgregar }) {
  const [productos, setProductos] = useState([])
  const [categoriasUnicas, setCategoriasUnicas] = useState([])
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('')
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [productosData, categoriasData] = await Promise.all([
          apiFetch('/productos'),
          apiFetch('/categorias').catch(() => [])
        ])

        setProductos(productosData)

        const desdeProductos = productosData.map((p) => p.categoria).filter(Boolean)
        const desdeTabla = categoriasData.map((c) => c.nombre).filter(Boolean)
        const unicas = [...new Set([...desdeTabla, ...desdeProductos])]

        setCategoriasUnicas(unicas)
        if (unicas.length > 0) {
          setCategoriaSeleccionada(unicas[0])
        }
      } catch (err) {
        console.error('Error al cargar categorías y productos:', err)
      } finally {
        setCargando(false)
      }
    }

    cargarDatos()
  }, [])

  const productosFiltrados = productos.filter((p) => p.categoria === categoriaSeleccionada)

  if (cargando) {
    return (
      <div className="container my-5 text-center">
        <h4>Cargando categorías y servicios...</h4>
      </div>
    )
  }

  return (
    <div className="container my-5">
      <h2 className="text-center fw-bold mb-4 text-primary">Nuestras Categorías</h2>

      {/* Selector de categorías visual */}
      <div className="row justify-content-center mb-5">
        {categoriasUnicas.map((cat, index) => (
          <div key={index} className="col-auto mb-3">
            <button
              className={`btn ${categoriaSeleccionada === cat ? 'btn-primary' : 'btn-outline-primary'} fw-bold px-4`}
              onClick={() => setCategoriaSeleccionada(cat)}
            >
              {cat}
            </button>
          </div>
        ))}
      </div>

      {categoriaSeleccionada && (
        <h4 className="fw-bold mb-4 border-bottom pb-2">Servicios en: {categoriaSeleccionada}</h4>
      )}

      {/* Grilla de productos filtrados */}
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
                <h5 className="card-title fw-bold fs-6">{producto.nombre}</h5>
                <h4 className="text-primary fw-bold my-2">
                  ${producto.precio?.toLocaleString('es-CL')}
                </h4>

                <div className="mt-auto">
                  <button
                    onClick={() => onAgregar(producto)}
                    className="btn btn-warning fw-bold w-100 mb-2"
                    disabled={producto.stock <= 0}
                  >
                    {producto.stock > 0 ? 'Añadir al carrito' : 'Sin cupos'}
                  </button>
                  <Link to={`/producto/${producto.id}`} className="btn btn-outline-primary w-100">
                    Ver detalle
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {productosFiltrados.length === 0 && (
          <div className="col-12 text-center text-muted my-5">
            <h5>No hay servicios disponibles en esta categoría en este momento.</h5>
          </div>
        )}
      </div>
    </div>
  )
}

export default Categorias