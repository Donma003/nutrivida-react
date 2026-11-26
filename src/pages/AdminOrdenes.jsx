import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiFetch } from '../services/api'

function AdminOrdenes() {
  const [ordenes, setOrdenes] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [ordenSeleccionada, setOrdenSeleccionada] = useState(null)

  useEffect(() => {
    const cargarOrdenes = async () => {
      try {
        const data = await apiFetch('/ordenes')
        setOrdenes(data)
      } catch (err) {
        setError(err.message || 'No se pudieron cargar las órdenes desde el servidor.')
      } finally {
        setCargando(false)
      }
    }
    cargarOrdenes()
  }, [])

  const formatearFecha = (fechaIso) => {
    if (!fechaIso) return 'Sin fecha'
    return new Date(fechaIso).toLocaleDateString('es-CL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="container-fluid" style={{ minHeight: '80vh' }}>
      <div className="row h-100">
        {/* MENÚ LATERAL VERTICAL */}
        <div className="col-md-3 col-lg-2 bg-dark text-white p-4 d-flex flex-column">
          <h4 className="fw-bold text-center mb-4 border-bottom pb-2">NutriVida Admin</h4>
          <ul className="nav nav-pills flex-column mb-auto gap-2">
            <li><Link to="/admin" className="nav-link text-white">📊 Dashboard</Link></li>
            <li className="nav-item">
              <Link to="/admin/ordenes" className="nav-link active fw-bold">🛒 Órdenes</Link>
            </li>
            <li><Link to="/admin/productos" className="nav-link text-white">📦 Productos</Link></li>
            <li><Link to="/admin/categorias" className="nav-link text-white">📑 Categorías</Link></li>
            <li><Link to="/admin/usuarios" className="nav-link text-white">👥 Usuarios</Link></li>
          </ul>
          <hr />
          <Link to="/" className="btn btn-danger w-100 fw-bold">⬅ Volver a Tienda</Link>
        </div>

        {/* CONTENIDO CENTRAL: GESTIÓN DE ÓRDENES */}
        <div className="col-md-9 col-lg-10 p-4 p-md-5 bg-light">
          <h2 className="fw-bold mb-1">Gestión de Órdenes</h2>
          <p className="text-muted mb-4">Revisa el historial real de compras y boletas emitidas en PostgreSQL.</p>

          {error && <div className="alert alert-danger">{error}</div>}

          {/* DETALLE DE BOLETA SELECCIONADA */}
          {ordenSeleccionada && (
            <div className="card shadow-sm border-primary mb-4">
              <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <span className="fw-bold">Detalle Boleta #{ordenSeleccionada.id}</span>
                <button
                  className="btn btn-sm btn-light fw-bold"
                  onClick={() => setOrdenSeleccionada(null)}
                >
                  Cerrar ✕
                </button>
              </div>
              <div className="card-body">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <p className="mb-1"><strong>Cliente:</strong> {ordenSeleccionada.clienteNombre}</p>
                    <p className="mb-1"><strong>Correo:</strong> {ordenSeleccionada.clienteCorreo}</p>
                  </div>
                  <div className="col-md-6">
                    <p className="mb-1"><strong>Dirección:</strong> {ordenSeleccionada.direccionEntrega}</p>
                    <p className="mb-1"><strong>Fecha:</strong> {formatearFecha(ordenSeleccionada.fecha)}</p>
                  </div>
                </div>

                {ordenSeleccionada.detalles && ordenSeleccionada.detalles.length > 0 ? (
                  <table className="table table-sm table-bordered">
                    <thead className="table-light">
                      <tr>
                        <th>Servicio / Producto</th>
                        <th>Cantidad</th>
                        <th>Precio Unit.</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ordenSeleccionada.detalles.map((det, idx) => (
                        <tr key={idx}>
                          <td>{det.producto?.nombre || `Producto #${det.producto?.id}`}</td>
                          <td>{det.cantidad}</td>
                          <td>${det.precioUnitario?.toLocaleString('es-CL')}</td>
                          <td className="fw-bold">${(det.cantidad * det.precioUnitario)?.toLocaleString('es-CL')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-muted small">Sin ítems detallados.</p>
                )}

                <div className="text-end fs-5 fw-bold text-success">
                  Total Pagado: ${ordenSeleccionada.total?.toLocaleString('es-CL')}
                </div>
              </div>
            </div>
          )}

          <div className="card shadow-sm border-0 p-4">
            {cargando ? (
              <p className="text-center text-muted my-3">Cargando órdenes...</p>
            ) : ordenes.length === 0 ? (
              <p className="text-center text-muted my-3">Aún no se han registrado órdenes en la base de datos.</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Nro Orden</th>
                      <th>Cliente</th>
                      <th>Correo</th>
                      <th>Fecha</th>
                      <th>Total Pagado</th>
                      <th>Estado</th>
                      <th className="text-end">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ordenes.map((orden) => (
                      <tr key={orden.id}>
                        <td className="fw-bold text-primary">#{orden.id}</td>
                        <td className="fw-semibold">{orden.clienteNombre}</td>
                        <td className="text-muted small">{orden.clienteCorreo}</td>
                        <td className="text-muted">{formatearFecha(orden.fecha)}</td>
                        <td className="fw-bold">${orden.total?.toLocaleString('es-CL')}</td>
                        <td>
                          <span className={`badge ${
                            orden.estado === 'PAGADA' || orden.estado === 'Completada' ? 'bg-success' :
                            orden.estado === 'PENDIENTE' ? 'bg-warning text-dark' : 'bg-danger'
                          }`}>
                            {orden.estado}
                          </span>
                        </td>
                        <td className="text-end">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => setOrdenSeleccionada(orden)}
                          >
                            Ver Boleta
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminOrdenes