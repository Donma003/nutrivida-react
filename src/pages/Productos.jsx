import { useState } from 'react'

const PRODUCTOS_INICIALES = [
  { id: 1, nombre: 'Proteína Vegana', precio: 25000, img: 'https://via.placeholder.com/200' },
  { id: 2, nombre: 'Creatina', precio: 18000, img: 'https://via.placeholder.com/200' },
  { id: 3, nombre: 'Plan Nutricional', precio: 35000, img: 'https://via.placeholder.com/200' }
]

function Productos({ onAgregar }) {
  const [productos] = useState(PRODUCTOS_INICIALES)

  return (
    <div>
      <h1 className="text-center mb-4">Nuestros Productos</h1>
      <div className="row g-4">
        {productos.map((prod) => (
          <div key={prod.id} className="col-md-4">
            <div className="card h-100 shadow-sm text-center p-3">
              <img src={prod.img} className="card-img-top mb-3" alt={prod.nombre} />
              <h5 className="card-title">{prod.nombre}</h5>
              <p className="fw-bold text-success">${prod.precio.toLocaleString()}</p>
              <button className="btn btn-primary mt-auto" onClick={() => onAgregar(prod)}>
                Añadir al carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Productos