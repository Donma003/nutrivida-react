import { Link } from 'react-router-dom'

function AdminUsuarios() {
  const usuarios = [
    { run: '19011022-K', nombre: 'Juan Pérez', correo: 'juan@gmail.com', rol: 'Cliente' },
    { run: '15432198-7', nombre: 'María Silva', correo: 'maria@duoc.cl', rol: 'Administrador' },
    { run: '18765432-1', nombre: 'Carlos Ruiz', correo: 'carlos@profesor.duoc.cl', rol: 'Vendedor' }
  ]

  return (
    <div className="row">
      <div className="col-md-3">
        <div className="card shadow-sm h-100">
          <div className="card-body p-0">
            <h5 className="bg-dark text-white p-3 mb-0 rounded-top">⚙️ Panel Admin</h5>
            <div className="list-group list-group-flush">
              <Link to="/admin" className="list-group-item list-group-item-action">Dashboard</Link>
              <Link to="/admin/productos" className="list-group-item list-group-item-action">Mantenedor Productos</Link>
              <Link to="/admin/usuarios" className="list-group-item list-group-item-action active">Mantenedor Usuarios</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-9">
        <div className="card shadow-sm">
          <div className="card-header bg-white d-flex justify-content-between align-items-center">
            <h2 className="mb-0">Usuarios</h2>
            <button className="btn btn-dark">NUEVO USUARIO</button>
          </div>
          <div className="card-body">
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th>RUN</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map(usu => (
                  <tr key={usu.run}>
                    <td>{usu.run}</td>
                    <td>{usu.nombre}</td>
                    <td>{usu.correo}</td>
                    <td>
                      <span className={`badge ${usu.rol === 'Administrador' ? 'bg-primary' : usu.rol === 'Vendedor' ? 'bg-info' : 'bg-secondary'}`}>
                        {usu.rol}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-2">Editar</button>
                      <button className="btn btn-sm btn-outline-danger">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminUsuarios