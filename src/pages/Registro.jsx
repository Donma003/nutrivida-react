import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { registrarUsuario } from '../services/api'

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
  const [cargando, setCargando] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'region' && { comuna: '' })
    }))
  }

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

  const handleRegistro = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.run.length < 7 || formData.run.length > 9) {
      setError('El RUN debe tener entre 7 y 9 caracteres (Sin puntos ni guion).')
      return
    }
    if (!validarRut(formData.run)) {
      setError('El RUN ingresado no es válido.')
      return
    }

    const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com']
    const correoValido = dominiosPermitidos.some(dominio => formData.correo.endsWith(dominio))
    if (!correoValido) {
      setError('El correo debe terminar en @duoc.cl, @profesor.duoc.cl o @gmail.com')
      return
    }

    setCargando(true)
    try {
      await registrarUsuario({
        nombre: `${formData.nombre} ${formData.apellidos}`.trim(),
        correo: formData.correo,
        password: formData.password,
        rol: 'CLIENTE'
      })
      navigate('/')
    } catch (err) {
      setError(err.message || 'Error al registrar la cuenta')
    } finally {
      setCargando(false)
    }
  }

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
              <input type="text" className="form-control" name="nombre" value={formData.nombre} onChange={handleChange} required maxLength="50" />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">APELLIDOS</label>
              <input type="text" className="form-control" name="apellidos" value={formData.apellidos} onChange={handleChange} required maxLength="100" />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">CORREO</label>
              <input type="email" className="form-control" name="correo" value={formData.correo} onChange={handleChange} placeholder="ejemplo@duoc.cl" required maxLength="100" />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">FECHA DE NACIMIENTO</label>
              <input type="date" className="form-control" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} />
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
            <input type="text" className="form-control" name="direccion" value={formData.direccion} onChange={handleChange} placeholder="Calle, Número, Depto" required maxLength="300" />
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold" disabled={cargando}>
            {cargando ? 'Registrando...' : 'Registrarse'}
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