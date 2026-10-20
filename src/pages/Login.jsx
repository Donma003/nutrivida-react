function Login() {
  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí irán las validaciones de JS más adelante
    console.log("Intentando iniciar sesión...")
  }

  return (
    <div className="row justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
      <div className="col-md-6 col-lg-4">
        <div className="card shadow-sm p-4">
          <h2 className="text-center mb-4 text-primary">Iniciar Sesión</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">CORREO</label>
              <input type="email" className="form-control" placeholder="ejemplo@duoc.cl" required />
            </div>
            <div className="mb-4">
              <label className="form-label fw-bold">CONTRASEÑA</label>
              <input type="password" className="form-control" required />
            </div>
            <button type="submit" className="btn btn-primary w-100 fw-bold">Ingresar</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login