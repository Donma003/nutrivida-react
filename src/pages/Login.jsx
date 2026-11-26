import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUsuario } from '../services/api'

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  const handleIngresar = async (e) => {
    e.preventDefault()
    setError('')
    setCargando(true)

    try {
      const data = await loginUsuario(email, password)

      if (data.usuario.rol === 'ADMIN') {
        navigate('/admin')
      } else {
        navigate('/')
      }
    } catch (err) {
      setError(err.message || 'Correo o contraseña incorrectos')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div className="card p-4 shadow-sm" style={{ width: '400px' }}>
        <h2 className="text-center mb-4 text-primary">Iniciar Sesión</h2>

        {error && <div className="alert alert-danger py-2 text-center fw-bold">{error}</div>}

        <form onSubmit={handleIngresar}>
          <div className="mb-3">
            <label className="form-label fw-bold">CORREO</label>
            <input
              type="email"
              className="form-control"
              placeholder="admin@nutrivida.cl"
              required
              maxLength="100"
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
              required
              minLength="4"
              maxLength="50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold" disabled={cargando}>
            {cargando ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login