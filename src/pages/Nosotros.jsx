function Nosotros() {
  return (
    <div className="mt-4">
      <h1 className="text-center mb-5 text-primary">Sobre NutriVida</h1>
      <div className="row align-items-center bg-white p-4 shadow-sm rounded">
        <div className="col-md-6 mb-4 mb-md-0">
          <img 
            src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Equipo NutriVida" 
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6">
          <h3 className="fw-bold">Nuestra Misión</h3>
          <p className="text-muted">
            En NutriVida buscamos mejorar la calidad de vida de nuestros pacientes a través de planes nutricionales 
            personalizados y suplementación de la más alta pureza en el mercado.
          </p>
          <h3 className="fw-bold mt-4">Nuestro Equipo</h3>
          <p className="text-muted">
            Contamos con un equipo clínico interdisciplinario de 4 nutricionistas especializados en pérdida de peso, 
            nutrición deportiva y bienestar integral.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Nosotros