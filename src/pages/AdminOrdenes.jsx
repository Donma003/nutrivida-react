import { useState } from 'react'
import { Link } from 'react-router-dom'

function AdminOrdenes() {
  const [ordenes] = useState([
    { id: '20261021', cliente: 'Pedro Figueroa', fecha: '21-10-2026', total: 28775, estado: 'Completada' },
    { id: '20261020', cliente: 'María López', fecha: '20-10-2026', total: 35000, estado: 'Pendiente' },
    { id: '20261018', cliente: 'Juan Pérez', fecha: '18-10-2026', total: 170000, estado: 'Completada' },
    { id: '20261015', cliente: 'Ana Silva', fecha: '15-10-2026', total: 15000, estado: 'Cancelada' }
  ])

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
            <li><Link to="/admin/reportes" className="nav-link text-white">📈 Reportes</Link></li>
          </ul>
          <hr />
          <Link to="/" className="btn btn-danger w-100 fw-bold">⬅ Volver a Tienda</Link>
        </div>

        {/* CONTENIDO CENTRAL: GESTIÓN DE ÓRDENES */}
        <div className="col-md-9 col-lg-10 p-4 p-md-5 bg-light">
          <h2 className="fw-bold mb-1">Gestión de Órdenes</h2>
          <p className="text-muted mb-4">Revisa el historial de compras y boletas emitidas.</p>

          <div className="card shadow-sm border-0 p-4">
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Nro Orden</th>
                    <th>Cliente</th>
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
                      <td className="fw-semibold">{orden.cliente}</td>
                      <td className="text-muted">{orden.fecha}</td>
                      <td className="fw-bold">${orden.total.toLocaleString('es-CL')}</td>
                      <td>
                        <span className={`badge ${
                          orden.estado === 'Completada' ? 'bg-success' : 
                          orden.estado === 'Pendiente' ? 'bg-warning text-dark' : 'bg-danger'
                        }`}>
                          {orden.estado}
                        </span>
                      </td>
                      <td className="text-end">
                        <button className="btn btn-sm btn-outline-primary">Ver Boleta</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default AdminOrdenes