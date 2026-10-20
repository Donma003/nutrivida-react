import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <div className="p-5 mb-4 bg-light rounded-3 text-center shadow-sm mt-4">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold text-primary">TIENDA ONLINE NutriVida</h1>
          <p className="col-md-8 mx-auto fs-4 text-muted mt-3">
            Mejora tu salud con nuestros planes y suplementos nutricionales. 
            Contamos con especialistas en pérdida de peso y nutrición deportiva.
          </p>
          <Link to="/productos" className="btn btn-primary btn-lg mt-3">
            Ver catálogo de productos
          </Link>
        </div>
      </div>
      
      <div className="row text-center mt-5">
        <div className="col-md-4">
          <h3>📦 Envíos rápidos</h3>
          <p>A toda la Región de La Araucanía y el país.</p>
        </div>
        <div className="col-md-4">
          <h3>🔒 Pago Seguro</h3>
          <p>Transacciones 100% protegidas.</p>
        </div>
        <div className="col-md-4">
          <h3>🩺 Calidad Clínica</h3>
          <p>Productos avalados por nuestros 4 nutricionistas.</p>
        </div>
      </div>
    </div>
  )
}

export default Home