function Registro() {
  return (
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        <div className="card shadow-sm p-4 mt-4">
          <h2 className="text-center mb-4">Registro de Usuario</h2>
          <form>
            <div className="mb-3">
              <label className="form-label">NOMBRE COMPLETO</label>
              <input type="text" className="form-control" required />
            </div>
            <div className="mb-3">
              <label className="form-label">CORREO</label>
              <input type="email" className="form-control" required />
            </div>
            <div className="row mb-3">
              <div className="col">
                <label className="form-label">CONTRASEÑA</label>
                <input type="password" className="form-control" required />
              </div>
              <div className="col">
                <label className="form-label">CONFIRMAR CONTRASEÑA</label>
                <input type="password" className="form-control" required />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">TELÉFONO (opcional)</label>
              <input type="tel" className="form-control" />
            </div>
            <div className="row mb-4">
              <div className="col">
                <select className="form-select">
                  <option value="">- Seleccione región -</option>
                  <option value="RM">Región Metropolitana</option>
                  <option value="IX">Región de La Araucanía</option>
                </select>
              </div>
              <div className="col">
                <select className="form-select">
                  <option value="">- Seleccione comuna -</option>
                  <option value="temuco">Temuco</option>
                  <option value="santiago">Santiago</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-success w-100 fw-bold">REGISTRAR</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Registro