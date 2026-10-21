import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { obtenerProductos } from '../data/productosCRUD.js'

function DetalleProducto({ onAgregar }) {
  const { id } = useParams()
  const [producto, setProducto] = useState(null)

  useEffect(() => {
    // Obtener todos los productos desde la base de datos real (localStorage)
    const productosDB = obtenerProductos()
    // Buscar el producto que coincide con el ID de la URL
    const encontrado = productosDB.find(p => p.id.toString() === id.toString())
    setProducto(encontrado)
  }, [id])

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
        {/* Imagen dinámica real */}
        <div className="col-md-6">
          <img 
            src={producto.imagen} 
            alt={producto.nombre} 
            className="img-fluid rounded shadow-sm w-100" 
            style={{ maxHeight: '450px', objectFit: 'cover' }}
          />
        </div>

        {/* Información dinámica real */}
        <div className="col-md-6">
          <span className="badge bg-info text-dark mb-2">{producto.categoria}</span>
          <h1 className="fw-bold mb-3">{producto.nombre}</h1>
          <h3 className="text-success fw-bold mb-4">${producto.precio.toLocaleString('es-CL')}</h3>
          
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
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  )
}

export default DetalleProducto