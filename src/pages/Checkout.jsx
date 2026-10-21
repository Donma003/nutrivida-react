import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

// Reutilizar el arreglo de ubicaciones para el formulario dinámico
const datosUbicacion = [
  { region: "Región Metropolitana", comunas: ["Santiago", "Maipú", "Cerrillos", "Providencia"] },
  { region: "Región de Valparaíso", comunas: ["Valparaíso", "Viña del Mar", "Quilpué"] },
  { region: "Región de La Araucanía", comunas: ["Temuco", "Padre Las Casas", "Villarrica"] }
]

function Checkout({ carrito }) {
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    nombre: '', apellidos: '', correo: '', 
    calle: '', departamento: '', region: '', comuna: '', indicaciones: ''
  })

  // Calcular el total a pagar
  const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'region' && { comuna: '' }) // Resetea comuna si cambia la región
    }))
  }

  const handlePagar = (e) => {
    e.preventDefault()

    // Simulador de pasarela de pago 
    const pagoExitoso = Math.random() > 0.2 

    if (pagoExitoso) {
      // Si el pago es exitoso, enviamos los datos a la página de éxito para imprimir la boleta
      navigate('/pago-exitoso', { state: { cliente: formData, carrito, total } })
    } else {
      // Si el pago falla, lo enviamos a la vista de error
      navigate('/pago-error')
    }
  }

  const comunasDisponibles = datosUbicacion.find(r => r.region === formData.region)?.comunas || []

  // Si alguien entra al checkout sin productos, le pedimos que vuelva
  if (carrito.length === 0) {
    return (
      <div className="container my-5 text-center">
        <h3 className="fw-bold text-muted mb-4">Tu carrito está vacío</h3>
        <Link to="/productos" className="btn btn-primary">Volver a los Servicios</Link>
      </div>
    )
  }

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
        <h2 className="fw-bold text-primary mb-0">Checkout</h2>
        <span className="btn btn-primary fw-bold fs-5 pointer-events-none">
          Total a pagar: ${total.toLocaleString('es-CL')}
        </span>
      </div>

      <div className="row g-5">
        {/* Columna Izquierda: Resumen del Carrito */}
        <div className="col-lg-5 order-lg-last">
          <div className="card shadow-sm border-0 bg-light p-3">
            <h4 className="fw-bold mb-3">Resumen de compra</h4>
            <div className="table-responsive">
              <table className="table table-sm table-borderless align-middle">
                <tbody>
                  {carrito.map((item, index) => (
                    <tr key={index} className="border-bottom">
                      <td style={{width: '60px'}}>
                        <img src={item.imagen} alt={item.nombre} className="img-fluid rounded" style={{height: '40px', objectFit: 'cover'}} />
                      </td>
                      <td className="small fw-semibold">{item.nombre} <br/><span className="text-muted">x{item.cantidad}</span></td>
                      <td className="text-end fw-bold">${(item.precio * item.cantidad).toLocaleString('es-CL')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="d-flex justify-content-between mt-3 px-2">
              <span className="fw-bold fs-5">TOTAL</span>
              <span className="fw-bold fs-5 text-success">${total.toLocaleString('es-CL')}</span>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Formulario de Datos */}
        <div className="col-lg-7">
          <form onSubmit={handlePagar} className="card shadow-sm border-0 p-4">
            
            <h5 className="fw-bold text-secondary mb-3">1. Información del cliente</h5>
            <div className="row mb-4">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold small">Nombre</label>
                <input type="text" className="form-control" name="nombre" value={formData.nombre} onChange={handleChange} required />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold small">Apellidos</label>
                <input type="text" className="form-control" name="apellidos" value={formData.apellidos} onChange={handleChange} required />
              </div>
              <div className="col-12">
                <label className="form-label fw-semibold small">Correo Electrónico</label>
                <input type="email" className="form-control" name="correo" value={formData.correo} onChange={handleChange} required />
              </div>
            </div>

            <h5 className="fw-bold text-secondary mb-3">2. Dirección de facturación / atención</h5>
            <div className="row mb-4">
              <div className="col-md-8 mb-3">
                <label className="form-label fw-semibold small">Calle / Avenida</label>
                <input type="text" className="form-control" name="calle" value={formData.calle} onChange={handleChange} required />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label fw-semibold small">Dpto. (Opcional)</label>
                <input type="text" className="form-control" name="departamento" value={formData.departamento} onChange={handleChange} />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold small">Región</label>
                <select className="form-select" name="region" value={formData.region} onChange={handleChange} required>
                  <option value="">Seleccione...</option>
                  {datosUbicacion.map(r => <option key={r.region} value={r.region}>{r.region}</option>)}
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold small">Comuna</label>
                <select className="form-select" name="comuna" value={formData.comuna} onChange={handleChange} required disabled={!formData.region}>
                  <option value="">Seleccione...</option>
                  {comunasDisponibles.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="col-12">
                <label className="form-label fw-semibold small">Indicaciones adicionales (Opcional)</label>
                <textarea className="form-control" rows="2" name="indicaciones" value={formData.indicaciones} onChange={handleChange} placeholder="Ej: Llamar al llegar, dejar en conserjería..."></textarea>
              </div>
            </div>

            <button type="submit" className="btn btn-success w-100 fw-bold py-3 fs-5 mt-2">
              Pagar ahora ${total.toLocaleString('es-CL')}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Checkout