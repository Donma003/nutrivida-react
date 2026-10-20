import { Link } from 'react-router-dom'

function AdminHome() {
  return (
    <div className="row">
      {/* Menú Lateral (Sidebar) */}
      <div className="col-md-3">
        <div className="card shadow-sm h-100">
          <div className="card-body p-0">
            <h5 className="bg-dark text-white p-3 mb-0 rounded-top">⚙️ Panel Admin</h5>
            <div className="list-group list-group-flush">
              <Link to="/admin" className="list-group-item list-group-item-action active">Dashboard</Link>
              <Link to="/admin/productos" className="list-group-item list-group-item-action">Mantenedor Productos</Link>
              <Link to="/admin/usuarios" className="list-group-item list-group-item-action">Mantenedor Usuarios</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Área de Contenido Central */}
      <div className="col-md-9">
        <div className="card shadow-sm">
          <div className="card-header bg-white">
            <h2 className="mb-0">¡HOLA Administrador!</h2>
          </div>
          <div className="card-body">
            <p className="lead">Bienvenido al sistema de gestión de NutriVida.</p>
            <div className="row mt-4">
              <div className="col-md-6">
                <div className="card bg-primary text-white text-center p-3 mb-3">
                  <h3>15</h3>
                  <p className="mb-0">Productos Activos</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card bg-success text-white text-center p-3 mb-3">
                  <h3>42</h3>
                  <p className="mb-0">Usuarios Registrados</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminHome