import { useLocation, Link } from 'react-router-dom'

function PagoExitoso() {
  // Recibir los datos exactos que envia el Checkout
  const location = useLocation()
  const datosCompra = location.state

  // Si alguien entra aquí directamente sin comprar, lo enviamos al inicio
  if (!datosCompra) {
    return (
      <div className="container my-5 text-center">
        <h2>No hay ninguna compra reciente.</h2>
        <Link to="/" className="btn btn-primary mt-3">Volver al Inicio</Link>
      </div>
    )
  }

  const { cliente, carrito, total } = datosCompra
  // Simulamos un número de orden aleatorio
  const numeroOrden = Math.floor(Math.random() * 1000000)

  return (
    <div className="container my-5">
      <div className="card shadow border-0 p-4 p-md-5">
        <div className="text-center mb-5">
          <h1 className="text-success fw-bold">¡Pago Exitoso!</h1>
          <h4 className="text-muted">Se ha realizado la compra nro #{numeroOrden}</h4>
        </div>

        <div className="row g-5">
          <div className="col-md-6">
            <h5 className="fw-bold border-bottom pb-2">Datos del Cliente</h5>
            <p className="mb-1"><strong>Nombre:</strong> {cliente.nombre} {cliente.apellidos}</p>
            <p className="mb-1"><strong>Correo:</strong> {cliente.correo}</p>
            
            <h5 className="fw-bold border-bottom pb-2 mt-4">Dirección de Entrega</h5>
            <p className="mb-1"><strong>Calle:</strong> {cliente.calle} {cliente.departamento && `Dpto ${cliente.departamento}`}</p>
            <p className="mb-1"><strong>Comuna:</strong> {cliente.comuna}, {cliente.region}</p>
            {cliente.indicaciones && <p className="mb-1"><strong>Indicaciones:</strong> {cliente.indicaciones}</p>}
          </div>

          <div className="col-md-6">
            <h5 className="fw-bold border-bottom pb-2">Resumen de Productos</h5>
            <ul className="list-group list-group-flush mb-3">
              {carrito.map((item, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between px-0">
                  <span>{item.nombre} (x{item.cantidad})</span>
                  <span>${(item.precio * item.cantidad).toLocaleString('es-CL')}</span>
                </li>
              ))}
            </ul>
            <div className="d-flex justify-content-between bg-light p-3 rounded">
              <h4 className="fw-bold mb-0">Total Pagado:</h4>
              <h4 className="fw-bold text-success mb-0">${total.toLocaleString('es-CL')}</h4>
            </div>
          </div>
        </div>

        <div className="text-center mt-5">
          <Link to="/" className="btn btn-primary px-5 py-2 fw-bold">Volver a la Tienda</Link>
        </div>
      </div>
    </div>
  )
}

export default PagoExitoso