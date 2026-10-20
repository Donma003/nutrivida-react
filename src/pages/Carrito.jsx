function Carrito({ carrito, cambiarCantidad }) {
  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)

  return (
    <div>
      <h1 className="mb-4">Mi Carrito</h1>
      {carrito.length === 0 ? (
        <div className="alert alert-info">Tu carrito está vacío.</div>
      ) : (
        <div className="row">
          <div className="col-md-8">
            <ul className="list-group mb-3">
              {carrito.map((item) => (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h6>{item.nombre}</h6>
                    <small className="text-muted">${item.precio.toLocaleString()}</small>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => cambiarCantidad(item.id, -1)}>-</button>
                    <span className="fw-bold">{item.cantidad}</span>
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => cambiarCantidad(item.id, 1)}>+</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-4">
            <div className="card p-3 shadow-sm">
              <h4>Total: <span className="text-success">${total.toLocaleString()}</span></h4>
              <button className="btn btn-success mt-3 w-100">Proceder al Pago</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Carrito