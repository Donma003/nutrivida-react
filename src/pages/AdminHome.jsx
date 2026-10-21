import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { obtenerProductos } from '../data/productosCRUD.js'

function AdminHome() {
  const [totalProductos, setTotalProductos] = useState(0)

  useEffect(() => {
    // Leer la base de datos para contar los servicios reales
    const productosDB = obtenerProductos()
    setTotalProductos(productosDB.length)
  }, [])

  return (
    <div className="container-fluid" style={{ minHeight: '80vh' }}>
      <div className="row h-100">
        
        {/* MENÚ LATERAL VERTICAL */}
        <div className="col-md-3 col-lg-2 bg-dark text-white p-4 d-flex flex-column">
          <h4 className="fw-bold text-center mb-4 border-bottom pb-2">NutriVida Admin</h4>
          <ul className="nav nav-pills flex-column mb-auto gap-2">
            <li className="nav-item">
              <Link to="/admin" className="nav-link active fw-bold">📊 Dashboard</Link>
            </li>
            <li><Link to="/admin/ordenes" className="nav-link text-white">🛒 Órdenes</Link></li>
            <li><Link to="/admin/productos" className="nav-link text-white">📦 Productos</Link></li>
            <li><Link to="/admin/categorias" className="nav-link text-white">📑 Categorías</Link></li>
            <li><Link to="/admin/usuarios" className="nav-link text-white">👥 Usuarios</Link></li>
            <li><Link to="/admin/reportes" className="nav-link text-white">📈 Reportes</Link></li>
          </ul>
          <hr />
          <Link to="/" className="btn btn-danger w-100 fw-bold">⬅ Volver a Tienda</Link>
        </div>

        {/* CONTENIDO CENTRAL: DASHBOARD*/}
        <div className="col-md-9 col-lg-10 p-4 p-md-5 bg-light">
          <h2 className="fw-bold mb-1">Dashboard</h2>
          <p className="text-muted mb-4">Resumen de las actividades diarias</p>

          {/* Tarjetas de Resumen */}
          <div className="row g-4 mb-5">
            <div className="col-md-4">
              <div className="card text-white bg-primary border-0 shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title fw-bold">🛒 Compras</h5>
                  <h2 className="display-5 fw-bold">1,234</h2>
                  <p className="card-text small mb-0">Probabilidad de aumento: 20%</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-white bg-success border-0 shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title fw-bold">📦 Productos</h5>
                  {/* Conectado a tu CRUD real */}
                  <h2 className="display-5 fw-bold">{totalProductos}</h2> 
                  <p className="card-text small mb-0">Inventario actual sincronizado</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-dark bg-warning border-0 shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title fw-bold">👥 Usuarios</h5>
                  <h2 className="display-5 fw-bold">890</h2>
                  <p className="card-text small mb-0">Nuevos usuarios este mes: +120</p>
                </div>
              </div>
            </div>
          </div>

          {/* Grilla de Accesos Directos */}
          <div className="row g-4">
            <div className="col-md-3">
              <div className="card border-0 shadow-sm text-center py-3">
                <h6 className="fw-bold">Órdenes</h6>
                <small className="text-muted px-2">Gestión y seguimiento de boletas.</small>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border-0 shadow-sm text-center py-3">
                <h6 className="fw-bold">Productos</h6>
                <small className="text-muted px-2">Administrar inventario y detalles.</small>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border-0 shadow-sm text-center py-3">
                <h6 className="fw-bold">Categorías</h6>
                <small className="text-muted px-2">Organizar servicios de la clínica.</small>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border-0 shadow-sm text-center py-3">
                <h6 className="fw-bold">Usuarios</h6>
                <small className="text-muted px-2">Gestión de cuentas y roles.</small>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default AdminHome