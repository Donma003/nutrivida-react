import { useParams, Link } from 'react-router-dom'

// Simulamos la misma base de datos de productos
const PRODUCTOS = [
  { id: 1, nombre: 'Proteína Vegana 1kg', precio: 25000, desc: 'Suplemento base de arveja y soya, ideal para recuperación muscular post-entreno. Libre de gluten y lácteos.', img: '/img/proteina-vegana.webp' },
  { id: 2, nombre: 'Creatina Monohidratada 300g', precio: 18000, desc: 'Máxima pureza para aumentar la fuerza y el rendimiento en ejercicios de alta intensidad.', img: '/img/creatina-monohidratada.avif' },
  { id: 3, nombre: 'Plan Nutricional 1 Mes', precio: 35000, desc: 'Asesoría 100% personalizada con uno de nuestros nutricionistas clínicos. Incluye pauta de alimentación y controles semanales.', img: '/img/plan-nutricional.jpg' },
  { id: 4, nombre: 'Multivitamínico Deportivo', precio: 12000, desc: '60 cápsulas con el complejo vitamínico y minerales necesarios para mantener la energía diaria.', img: '/img/multivitaminico.webp' }
]

function DetalleProducto({ onAgregar }) {
  const { id } = useParams() // obtener el ID de la URL
  const producto = PRODUCTOS.find(prod => prod.id === parseInt(id))

  if (!producto) {
    return <h2 className="text-center mt-5 text-danger">Producto no encontrado</h2>
  }

  return (
    <div className="container mt-4">
      <Link to="/productos" className="btn btn-outline-secondary mb-4">← Volver al catálogo</Link>
      <div className="row bg-white shadow-sm p-4 rounded">
        <div className="col-md-6 text-center mb-4 mb-md-0">
          <img src={producto.img} alt={producto.nombre} className="img-fluid rounded border" />
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-center">
          <h2 className="fw-bold">{producto.nombre}</h2>
          <p className="fs-5 text-success fw-bold">${producto.precio.toLocaleString()}</p>
          <hr />
          <p className="text-muted">{producto.desc}</p>
          <ul className="list-unstyled mt-3 mb-4">
            <li>✅ Stock disponible</li>
            <li>🚚 Envío a todo Chile</li>
            <li>💳 Pago seguro</li>
          </ul>
          <button 
            className="btn btn-primary btn-lg w-100 mt-auto"
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