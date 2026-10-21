import { Link } from 'react-router-dom'

function PagoError() {
  const numeroIntento = Math.floor(Math.random() * 1000000)

  return (
    <div className="container my-5 text-center">
      <div className="card shadow-sm border-danger p-5 mx-auto" style={{ maxWidth: '600px' }}>
        <h1 className="text-danger fw-bold mb-3">❌ Pago Rechazado</h1>
        <h5 className="text-muted mb-4">No se pudo procesar tu pago. Intento nro #{numeroIntento}</h5>
        
        <p className="mb-5">
          Hubo un problema de comunicación con el banco o los fondos son insuficientes. 
          Por favor, verifica tus datos de facturación e intenta nuevamente.
        </p>

        <Link to="/checkout" className="btn btn-danger fw-bold px-4 py-2">
          Volver a realizar el pago
        </Link>
      </div>
    </div>
  )
}

export default PagoError