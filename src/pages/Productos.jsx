import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { obtenerProductos } from '../data/productosCRUD.js'

function Productos({ onAgregar }) {
  const [productos, setProductos] = useState([])

  // Hook de React para cargar los datos apenas se abre la pagina
  useEffect(() => {
    const datosCargados = obtenerProductos()
    setProductos(datosCargados)
  }, [])

  return (
    <div className="container my-5">
      <h2 className="text-center fw-bold mb-5 text-primary">Nuestros Servicios y Planes</h2>
      
      <div className="row g-4">
        {productos.map((producto) => (
          <div key={producto.id} className="col-12 col-md-4 col-lg-3">
            <div className="card h-100 shadow-sm border-0">
              
              <img 
                src={producto.imagen} 
                className="card-img-top" 
                alt={producto.nombre} 
                style={{ height: '200px', objectFit: 'cover' }}
              />
              
              <div className="card-body d-flex flex-column">
                <span className="badge bg-info text-dark w-50 mb-2">{producto.categoria}</span>
                <h5 className="card-title fw-bold fs-6">{producto.nombre}</h5>
                <p className="card-text text-muted small flex-grow-1">
                  {producto.descripcion.substring(0, 60)}...
                </p>
                
                <h4 className="text-primary fw-bold mb-3">
                  ${producto.precio.toLocaleString('es-CL')}
                </h4>
                
                <div className="d-flex flex-column gap-2 mt-auto">
                  {/* Botón para añadir al carrito (recibe la función desde App.jsx) */}
                  <button 
                    onClick={() => onAgregar(producto)} 
                    className="btn btn-warning fw-bold w-100"
                    disabled={producto.stock <= 0}
                  >
                    {producto.stock > 0 ? 'Añadir al carrito' : 'Sin cupos'}
                  </button>
                  
                  {/* Enlace para ver el detalle del producto */}
                  <Link 
                    to={`/producto/${producto.id}`} 
                    className="btn btn-outline-primary w-100"
                  >
                    Ver detalle
                  </Link>
                </div>
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Productos