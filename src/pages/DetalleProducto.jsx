import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { apiFetch } from '../services/api'

function DetalleProducto({ onAgregar }) {
  const { id } = useParams()
  const [producto, setProducto] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        const data = await apiFetch(`/productos/${id}`)
        setProducto(data)
      } catch (err) {
        setProducto(null)
      } finally {
        setCargando(false)
      }
    }
    cargarProducto()
  }, [id])

  if (cargando) {
    return (
      <div className="container my-5 text-center">
        <h4>Cargando detalle del servicio...</h4>
      </div>
    )
  }

  if (!producto) {
    return (
      <div className="container my-5 text-center">
        <h3>Servicio no encontrado</h3>
        <Link to="/productos" className="btn btn-primary mt-3">Volver al catálogo</Link>
      </div>
    )
  }

  return (
    <div className="container my-5">
      <Link to="/productos" className="btn btn-outline-secondary mb-4">
        ← Volver al catálogo
      </Link>

      <div className="row g-5 align-items-center">
        <div className="col-md-6">
          <img
            src={producto.imagen || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500'}
            alt={producto.nombre}
            className="img-fluid rounded shadow-sm w-100"
            style={{ maxHeight: '450px', objectFit: 'cover' }}
          />
        </div>

        <div className="col-md-6">
          <span className="badge bg-info text-dark mb-2">{producto.categoria}</span>
          <h1 className="fw-bold mb-3">{producto.nombre}</h1>
          <h3 className="text-success fw-bold mb-4">${producto.precio?.toLocaleString('es-CL')}</h3>

          <p className="text-muted mb-4" style={{ lineHeight: '1.8' }}>
            {producto.descripcion}
          </p>

          <div className="mb-4">
            <p className="mb-1 text-success">✔ Stock disponible: {producto.stock} unidades</p>
            <p className="mb-1 text-muted">🚚 Envío e inscripción inmediata en clínica</p>
            <p className="mb-1 text-muted">💳 Pago seguro garantizado</p>
          </div>

          <button
            className="btn btn-primary btn-lg w-100 fw-bold py-3"
            onClick={() => onAgregar(producto)}
            disabled={producto.stock <= 0}
          >
            {producto.stock > 0 ? 'Añadir al carrito' : 'Sin cupos disponibles'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DetalleProducto