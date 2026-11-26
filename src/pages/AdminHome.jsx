import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiFetch } from '../services/api'

function AdminHome() {
  const [stats, setStats] = useState({
    totalOrdenes: 0,
    ingresosTotales: 0,
    totalProductos: 0,
    totalUsuarios: 0
  })
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const cargarEstadisticas = async () => {
      try {
        const [productos, ordenes, usuarios] = await Promise.all([
          apiFetch('/productos'),
          apiFetch('/ordenes'),
          apiFetch('/usuarios')
        ])

        const ingresos = ordenes.reduce((acc, ord) => acc + (ord.total || 0), 0)

        setStats({
          totalOrdenes: ordenes.length,
          ingresosTotales: ingresos,
          totalProductos: productos.length,
          totalUsuarios: usuarios.length
        })
      } catch (err) {
        console.error('Error al cargar estadísticas del dashboard:', err)
      } finally {
        setCargando(false)
      }
    }

    cargarEstadisticas()
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
          </ul>
          <hr />
          <Link to="/" className="btn btn-danger w-100 fw-bold">⬅ Volver a Tienda</Link>
        </div>

        {/* CONTENIDO CENTRAL: DASHBOARD */}
        <div className="col-md-9 col-lg-10 p-4 p-md-5 bg-light">
          <h2 className="fw-bold mb-1">Dashboard</h2>
          <p className="text-muted mb-4">Resumen en tiempo real sincronizado con PostgreSQL</p>

          {/* Tarjetas de Resumen */}
          <div className="row g-4 mb-5">
            <div className="col-md-4">
              <div className="card text-white bg-primary border-0 shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title fw-bold">🛒 Compras</h5>
                  <h2 className="display-5 fw-bold">
                    {cargando ? '...' : stats.totalOrdenes}
                  </h2>
                  <p className="card-text small mb-0">
                    Ingresos acumulados: ${stats.ingresosTotales.toLocaleString('es-CL')}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-white bg-success border-0 shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title fw-bold">📦 Productos</h5>
                  <h2 className="display-5 fw-bold">
                    {cargando ? '...' : stats.totalProductos}
                  </h2>
                  <p className="card-text small mb-0">Inventario actual en base de datos</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-dark bg-warning border-0 shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title fw-bold">👥 Usuarios</h5>
                  <h2 className="display-5 fw-bold">
                    {cargando ? '...' : stats.totalUsuarios}
                  </h2>
                  <p className="card-text small mb-0">Cuentas registradas en el sistema</p>
                </div>
              </div>
            </div>
          </div>

          {/* Grilla de Accesos Directos */}
          <div className="row g-4">
            <div className="col-md-3">
              <Link to="/admin/ordenes" className="text-decoration-none text-dark">
                <div className="card border-0 shadow-sm text-center py-3 h-100">
                  <h6 className="fw-bold">Órdenes</h6>
                  <small className="text-muted px-2">Gestión y seguimiento de boletas.</small>
                </div>
              </Link>
            </div>
            <div className="col-md-3">
              <Link to="/admin/productos" className="text-decoration-none text-dark">
                <div className="card border-0 shadow-sm text-center py-3 h-100">
                  <h6 className="fw-bold">Productos</h6>
                  <small className="text-muted px-2">Administrar inventario y detalles.</small>
                </div>
              </Link>
            </div>
            <div className="col-md-3">
              <Link to="/admin/categorias" className="text-decoration-none text-dark">
                <div className="card border-0 shadow-sm text-center py-3 h-100">
                  <h6 className="fw-bold">Categorías</h6>
                  <small className="text-muted px-2">Organizar servicios de la clínica.</small>
                </div>
              </Link>
            </div>
            <div className="col-md-3">
              <Link to="/admin/usuarios" className="text-decoration-none text-dark">
                <div className="card border-0 shadow-sm text-center py-3 h-100">
                  <h6 className="fw-bold">Usuarios</h6>
                  <small className="text-muted px-2">Gestión de cuentas y roles.</small>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminHome