function Contacto() {
  return (
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        <div className="card shadow-sm p-4 mt-4 bg-light border-0">
          <h2 className="text-center mb-4">FORMULARIO DE CONTACTO</h2>
          <form>
            <div className="mb-3">
              <label className="form-label">NOMBRE COMPLETO</label>
              <input type="text" className="form-control" required />
            </div>
            <div className="mb-3">
              <label className="form-label">CORREO</label>
              <input type="email" className="form-control" required />
            </div>
            <div className="mb-4">
              <label className="form-label">MENSAJE</label>
              <textarea className="form-control" rows="5" required></textarea>
            </div>
            <button type="submit" className="btn btn-dark w-100 fw-bold">ENVIAR MENSAJE</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contacto