function Blogs() {
  const noticias = [
    {
      id: 1,
      titulo: "El impacto de la Proteína Vegana en el alto rendimiento",
      texto: "Descubre cómo nuestro paciente Carlos logró aumentar su masa muscular de forma limpia en solo tres meses, cambiando su suplementación tradicional por nuestra línea 100% basada en plantas tras una evaluación clínica.",
      imagen: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=350&fit=crop"
    },
    {
      id: 2,
      titulo: "Recuperación acelerada con Nutrición Clínica",
      texto: "Conoce la historia de Valeria, una maratonista que utilizó nuestro plan nutricional personalizado y suplementación con creatina para superar una lesión de rodilla y volver a las pistas en tiempo récord.",
      imagen: "https://images.unsplash.com/photo-1483721310020-03333e577078?w=600&h=350&fit=crop"
    }
  ];

  return (
    <div className="container my-5">
      <h2 className="text-center fw-bold mb-5">NOTICIAS IMPORTANTES</h2>

      {noticias.map((noticia) => (
        <div 
          key={noticia.id} 
          className="card mb-5 border-0 rounded-0" 
          style={{ backgroundColor: '#e2e2e2' }} 
        >
          <div className="row g-0 align-items-center">
            
            {/* Columna Izquierda: Textos y Botón */}
            <div className="col-md-6 p-5">
              <h3 className="fw-bold mb-4">{noticia.titulo}</h3>
              <p className="mb-4" style={{ fontSize: '0.95rem' }}>{noticia.texto}</p>
              
              {/* Botón estilo dropdown del mockup */}
              <button className="btn btn-light border-dark rounded-0 px-4 py-2 d-flex justify-content-between align-items-center" style={{ width: '160px' }}>
                VER CASO <span className="ms-2">▾</span>
              </button>
            </div>

            {/* Columna Derecha: Imagen */}
            <div className="col-md-6 p-3">
              <img 
                src={noticia.imagen} 
                className="img-fluid w-100 border border-secondary" 
                alt={noticia.titulo} 
                style={{ objectFit: 'cover', minHeight: '250px' }}
              />
            </div>
            
          </div>
        </div>
      ))}
    </div>
  );
}

export default Blogs;