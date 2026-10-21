import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

// Arreglo de Regiones y Comunas (Requisito de la pauta)
const datosUbicacion = [
  {
    region: "Región Metropolitana",
    comunas: ["Santiago", "Maipú", "Puente Alto", "Providencia"]
  },
  {
    region: "Región de Valparaíso",
    comunas: ["Valparaíso", "Viña del Mar", "Quilpué"]
  },
  {
    region: "Región de La Araucanía",
    comunas: ["Temuco", "Padre Las Casas", "Villarrica"]
  }
]

function Registro() {
  const navigate = useNavigate()

  // Estado unificado para el formulario
  const [formData, setFormData] = useState({
    run: '',
    nombre: '',
    apellidos: '',
    correo: '',
    password: '',
    fechaNacimiento: '',
    region: '',
    comuna: '',
    direccion: ''
  })
  
  const [error, setError] = useState('')

  // Función para manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Si cambia la región, reseteamos la comuna automáticamente
      ...(name === 'region' && { comuna: '' }) 
    }))
  }

  // Algoritmo de validación de RUT Chileno
  const validarRut = (rutCompleto) => {
    if (!/^[0-9]+[0-9kK]{1}$/.test(rutCompleto)) return false
    const cuerpo = rutCompleto.slice(0, -1)
    const dv = rutCompleto.slice(-1).toUpperCase()
    
    let suma = 0
    let multiplo = 2
    for (let i = 1; i <= cuerpo.length; i++) {
      suma += multiplo * rutCompleto.charAt(cuerpo.length - i)
      multiplo = multiplo < 7 ? multiplo + 1 : 2
    }
    
    const dvEsperado = 11 - (suma % 11)
    let dvCalculado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString()
    
    return dvCalculado === dv
  }

  const handleRegistro = (e) => {
    e.preventDefault()
    setError('')

    // 1. Validar RUN (Requerido, 7 a 9 caracteres, sin puntos ni guion)
    if (formData.run.length < 7 || formData.run.length > 9) {
      setError('El RUN debe tener entre 7 y 9 caracteres (Sin puntos ni guion).')
      return
    }
    if (!validarRut(formData.run)) {
      setError('El RUN ingresado no es válido.')
      return
    }

    // 2. Validar Correo (Dominios permitidos)[cite: 30]
    const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com']
    const correoValido = dominiosPermitidos.some(dominio => formData.correo.endsWith(dominio))
    if (!correoValido) {
      setError('El correo debe terminar en @duoc.cl, @profesor.duoc.cl o @gmail.com')
      return
    }

    // Si pasa todas las validaciones de JS y HTML, simulamos registro exitoso
    navigate('/login')
  }

  // Obtenemos las comunas disponibles según la región seleccionada
  const comunasDisponibles = datosUbicacion.find(r => r.region === formData.region)?.comunas || []

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div className="card p-4 shadow-sm" style={{ width: '600px' }}>
        <h2 className="text-center mb-4 text-primary">Crear Cuenta</h2>
        
        {error && <div className="alert alert-danger py-2 text-center fw-bold">{error}</div>}

        <form onSubmit={handleRegistro}>
          
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">RUN (Sin puntos ni guion)</label>
              <input type="text" className="form-control" name="run" value={formData.run} onChange={handleChange} placeholder="19011022K" required maxLength="9" minLength="7" />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">CONTRASEÑA</label>
              <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} placeholder="Mínimo 6 caracteres" required minLength="6" />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">NOMBRES</label>
              <input type="text" className="form-control" name="nombre" value={formData.nombre} onChange={handleChange} required maxLength="50" /> {/* Max 50 caracteres[cite: 30] */}
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">APELLIDOS</label>
              <input type="text" className="form-control" name="apellidos" value={formData.apellidos} onChange={handleChange} required maxLength="100" /> {/* Max 100 caracteres[cite: 30] */}
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">CORREO</label>
              <input type="email" className="form-control" name="correo" value={formData.correo} onChange={handleChange} placeholder="ejemplo@duoc.cl" required maxLength="100" /> {/* Max 100 caracteres[cite: 30] */}
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">FECHA DE NACIMIENTO</label>
              <input type="date" className="form-control" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} /> {/* Opcional[cite: 30] */}
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">REGIÓN</label>
              <select className="form-select" name="region" value={formData.region} onChange={handleChange} required>
                <option value="">Seleccione región...</option>
                {datosUbicacion.map(r => (
                  <option key={r.region} value={r.region}>{r.region}</option>
                ))}
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">COMUNA</label>
              {/* Se deshabilita si no hay región seleccionada[cite: 31] */}
              <select className="form-select" name="comuna" value={formData.comuna} onChange={handleChange} required disabled={!formData.region}>
                <option value="">Seleccione comuna...</option>
                {comunasDisponibles.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold">DIRECCIÓN</label>
            <input type="text" className="form-control" name="direccion" value={formData.direccion} onChange={handleChange} placeholder="Calle, Número, Depto" required maxLength="300" /> {/* Max 300 caracteres[cite: 31] */}
          </div>
          
          <button type="submit" className="btn btn-primary w-100 fw-bold">
            Registrarse
          </button>
          
        </form>

        <div className="text-center mt-4">
          <small className="text-muted">
            ¿Ya tienes una cuenta? <Link to="/login" className="text-primary fw-bold text-decoration-none">Inicia sesión aquí</Link>
          </small>
        </div>
      </div>
    </div>
  )
}

export default Registro