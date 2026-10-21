import { Link } from 'react-router-dom'

function Productos({ onAgregar }) {
  // Lista de productos
  const PRODUCTOS = [
    { id: 1, nombre: 'Proteína Vegana 1kg', precio: 25000, img: '/img/proteina-vegana.webp' },
    { id: 2, nombre: 'Creatina Monohidratada 300g', precio: 18000, img: '/img/creatina-monohidratada.avif' },
    { id: 3, nombre: 'Plan Nutricional 1 Mes', precio: 35000, img: '/img/plan-nutricional.jpg' },
    { id: 4, nombre: 'Multivitamínico Deportivo', precio: 12000, img: '/img/multivitaminico.webp' }
  ]

  return (
    <div className="mt-4">
      <h2 className="mb-4">Catálogo de Productos</h2>
      <div className="row g-4">
        {PRODUCTOS.map((prod) => (
          <div key={prod.id} className="col-md-3">
            <div className="card h-100 shadow-sm border-0">
              <img src={prod.img} className="card-img-top" alt={prod.nombre} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fs-6">{prod.nombre}</h5>
                <p className="fw-bold text-primary mt-auto">${prod.precio.toLocaleString()}</p>
                
                {/*botones*/}
                <div className="d-grid gap-2 mt-2">
                  <Link to={`/producto/${prod.id}`} className="btn btn-outline-dark btn-sm">
                    Ver detalle
                  </Link>
                  <button className="btn btn-primary btn-sm" onClick={() => onAgregar(prod)}>
                    Añadir al carrito
                  </button>
                </div>
                {/*fin de los botones*/}

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Productos