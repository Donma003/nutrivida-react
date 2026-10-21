import { Link } from 'react-router-dom'

function AdminProductos() {
  const productos = [
    { id: 1, codigo: 'PROD-01', nombre: 'Proteína Vegana', precio: 25000, stock: 15 },
    { id: 2, codigo: 'PROD-02', nombre: 'Creatina', precio: 18000, stock: 8 },
    { id: 3, codigo: 'PLAN-01', nombre: 'Plan Nutricional', precio: 35000, stock: 100 }
  ]

  return (
    <div className="row">
      <div className="col-md-3">
        <div className="card shadow-sm h-100">
          <div className="card-body p-0">
            <h5 className="bg-dark text-white p-3 mb-0 rounded-top">⚙️ Panel Admin</h5>
            <div className="list-group list-group-flush">
              <Link to="/admin" className="list-group-item list-group-item-action">Dashboard</Link>
              <Link to="/admin/productos" className="list-group-item list-group-item-action active">Mantenedor Productos</Link>
              <Link to="/admin/usuarios" className="list-group-item list-group-item-action">Mantenedor Usuarios</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-9">
        <div className="card shadow-sm">
          <div className="card-header bg-white d-flex justify-content-between align-items-center">
            <h2 className="mb-0">Productos</h2>
            <button className="btn btn-dark">NUEVO PRODUCTO</button>
          </div>
          <div className="card-body">
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map(prod => (
                  <tr key={prod.id}>
                    <td>{prod.codigo}</td>
                    <td>{prod.nombre}</td>
                    <td>${prod.precio.toLocaleString()}</td>
                    <td>
                      <span className={`badge ${prod.stock < 10 ? 'bg-danger' : 'bg-success'}`}>
                        {prod.stock}
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

export default AdminProductos