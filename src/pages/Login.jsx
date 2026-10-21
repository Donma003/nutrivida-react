import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()

  // Estados para capturar los datos y manejar errores
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleIngresar = (e) => {
    e.preventDefault()
    setError('') // Limpia errores previos

    // Validación de dominios permitidos
    const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com']
    const correoValido = dominiosPermitidos.some(dominio => email.endsWith(dominio))
    
    if (!correoValido) {
      setError('El correo debe terminar en @duoc.cl, @profesor.duoc.cl o @gmail.com')
      return // Detiene la ejecución si el correo es inválido
    }

    // Si todo está correcto, ingresa al panel
    navigate('/admin')
  }

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div className="card p-4 shadow-sm" style={{ width: '400px' }}>
        <h2 className="text-center mb-4 text-primary">Iniciar Sesión</h2>
        
        {/* Alerta Bootstrap que se muestra solo si hay un error */}
        {error && <div className="alert alert-danger py-2 text-center fw-bold">{error}</div>}

        <form onSubmit={handleIngresar}>
          
          <div className="mb-3">
            <label className="form-label fw-bold">CORREO</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="ejemplo@duoc.cl" 
              required  // Validación: Requerido
              maxLength="100" // Validación: Máximo 100 caracteres
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="mb-4">
            <label className="form-label fw-bold">CONTRASEÑA</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="......" 
              required // Validación: Requerido
              minLength="4" // Validación: Mínimo 4 caracteres
              maxLength="10" // Validación: Máximo 10 caracteres
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button type="submit" className="btn btn-primary w-100 fw-bold">
            Ingresar
          </button>
          
        </form>
      </div>
    </div>
  )
}

export default Login