const productosIniciales = [
  {
    id: 1,
    codigo: "CN001",
    tipo: "Consulta",
    nombre: "Primera consulta nutricional",
    duracion: "50 min",
    modalidad: "Presencial",
    profesional: "Nutricionista",
    precio: 35000,
    stock: 50,
    stockCritico: 5,
    categoria: "Consulta",
    descripcion: "Evaluación inicial: anamnesis, antropometría completa y diseño del primer plan alimenticio.",
    imagen: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    codigo: "CN002",
    tipo: "Consulta",
    nombre: "Control nutricional (seguimiento)",
    duracion: "30 min",
    modalidad: "Presencial",
    profesional: "Nutricionista",
    precio: 25000,
    stock: 40,
    stockCritico: 5,
    categoria: "Consulta",
    descripcion: "Seguimiento mensual: medición de indicadores y ajuste del plan vigente.",
    imagen: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    codigo: "CN003",
    tipo: "Consulta",
    nombre: "Control nutricional quincenal",
    duracion: "30 min",
    modalidad: "Presencial",
    profesional: "Nutricionista",
    precio: 22000,
    stock: 30,
    stockCritico: 4,
    categoria: "Consulta",
    descripcion: "Seguimiento intensivo cada 15 días. Recomendado en los primeros 2 meses.",
    imagen: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 4,
    codigo: "CN004",
    tipo: "Consulta",
    nombre: "Teleconsulta nutricional",
    duracion: "30 min",
    modalidad: "Online (video)",
    profesional: "Nutricionista",
    precio: 20000,
    stock: 60,
    stockCritico: 10,
    categoria: "Consulta",
    descripcion: "Consulta de seguimiento vía videollamada. Requiere contar con consulta presencial previa.",
    imagen: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 5,
    codigo: "CN005",
    tipo: "Consulta",
    nombre: "Consulta de urgencia / reagendada",
    duracion: "30 min",
    modalidad: "Presencial",
    profesional: "Nutricionista",
    precio: 28000,
    stock: 15,
    stockCritico: 3,
    categoria: "Consulta",
    descripcion: "Para pacientes que requieren atención fuera de su control habitual.",
    imagen: "https://images.unsplash.com/photo-1584516150909-c43483ee7932?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 6,
    codigo: "PL001",
    tipo: "Plan especializado",
    nombre: "Plan pérdida de peso (1 mes)",
    duracion: "—",
    modalidad: "Presencial",
    profesional: "Nutricionista",
    precio: 65000,
    stock: 20,
    stockCritico: 3,
    categoria: "Plan especializado",
    descripcion: "Incluye primera consulta + 1 control quincenal + plan alimenticio personalizado + seguimiento por WhatsApp.",
    imagen: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 7,
    codigo: "PL002",
    tipo: "Plan especializado",
    nombre: "Plan pérdida de peso (3 meses)",
    duracion: "—",
    modalidad: "Presencial",
    profesional: "Nutricionista",
    precio: 170000,
    stock: 20,
    stockCritico: 3,
    categoria: "Plan especializado",
    descripcion: "Incluye primera consulta + 5 controles + 3 planes mensuales + seguimiento continuo.",
    imagen: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 8,
    codigo: "PL003",
    tipo: "Plan especializado",
    nombre: "Plan nutrición deportiva (1 mes)",
    duracion: "—",
    modalidad: "Presencial",
    profesional: "Nutricionista",
    precio: 70000,
    stock: 12,
    stockCritico: 2,
    categoria: "Plan especializado",
    descripcion: "Para deportistas y personas con actividad física frecuente. Cálculo de requerimientos energéticos y proteicos.",
    imagen: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 9,
    codigo: "PL004",
    tipo: "Plan especializado",
    nombre: "Plan control diabetes / hipertensión",
    duracion: "—",
    modalidad: "Presencial",
    profesional: "Nutricionista",
    precio: 75000,
    stock: 18,
    stockCritico: 3,
    categoria: "Plan especializado",
    descripcion: "Plan adaptado para patologías metabólicas. Coordinación con médico tratante si aplica.",
    imagen: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 10,
    codigo: "PL005",
    tipo: "Plan especializado",
    nombre: "Plan alimentación vegetariana/vegana",
    duracion: "—",
    modalidad: "Presencial",
    profesional: "Nutricionista",
    precio: 68000,
    stock: 25,
    stockCritico: 4,
    categoria: "Plan especializado",
    descripcion: "Diseñado para garantizar aporte adecuado de proteínas, hierro, vitamina B12 y calcio sin productos animales.",
    imagen: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 11,
    codigo: "PL006",
    tipo: "Plan especializado",
    nombre: "Plan alimentación infantil (2-12 años)",
    duracion: "—",
    modalidad: "Presencial",
    profesional: "Nutricionista",
    precio: 65000,
    stock: 15,
    stockCritico: 3,
    categoria: "Plan especializado",
    descripcion: "Evaluación nutricional pediátrica y diseño de plan adaptado a la etapa de desarrollo del niño.",
    imagen: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 12,
    codigo: "EV001",
    tipo: "Evaluación",
    nombre: "Antropometría completa",
    duracion: "20 min",
    modalidad: "Presencial",
    profesional: "Nutricionista",
    precio: 18000,
    stock: 50,
    stockCritico: 10,
    categoria: "Evaluación",
    descripcion: "Peso, talla, IMC, circunferencia de cintura, cadera, brazo y % de grasa corporal con bioimpedanciometría.",
    imagen: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 13,
    codigo: "EV002",
    tipo: "Evaluación",
    nombre: "Bioimpedanciometría",
    duracion: "15 min",
    modalidad: "Presencial",
    profesional: "Nutricionista",
    precio: 12000,
    stock: 20,
    stockCritico: 4,
    categoria: "Evaluación",
    descripcion: "Medición de composición corporal: masa grasa, masa muscular, agua corporal y edad metabólica.",
    imagen: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 14,
    codigo: "EV003",
    tipo: "Evaluación",
    nombre: "Encuesta de hábitos alimentarios",
    duracion: "20 min",
    modalidad: "Presencial",
    profesional: "Nutricionista",
    precio: 10000,
    stock: 25,
    stockCritico: 5,
    categoria: "Evaluación",
    descripcion: "Análisis del patrón alimentario actual. Identificación de déficit y excesos nutricionales.",
    imagen: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 15,
    codigo: "EV004",
    tipo: "Evaluación",
    nombre: "Análisis de exámenes de laboratorio",
    duracion: "20 min",
    modalidad: "Presencial",
    profesional: "Nutricionista",
    precio: 15000,
    stock: 35,
    stockCritico: 5,
    categoria: "Evaluación",
    descripcion: "Interpretación de hemograma, perfil bioquímico y lipídico en contexto nutricional.",
    imagen: "https://images.unsplash.com/photo-1579165466941-2f91e6557560?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 16,
    codigo: "TG001",
    tipo: "Taller grupal",
    nombre: "Taller de alimentación saludable",
    duracion: "90 min",
    modalidad: "Presencial (grupo)",
    profesional: "Nutricionista",
    precio: 15000,
    stock: 8,
    stockCritico: 2,
    categoria: "Taller grupal",
    descripcion: "Máx. 10 personas. Conceptos básicos de alimentación equilibrada y lectura de etiquetas.",
    imagen: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 17,
    codigo: "TG002",
    tipo: "Taller grupal",
    nombre: "Taller de cocina nutritiva",
    duracion: "120 min",
    modalidad: "Presencial (grupo)",
    profesional: "Nutricionista",
    precio: 20000,
    stock: 12,
    stockCritico: 3,
    categoria: "Taller grupal",
    descripcion: "Preparación de recetas saludables. Incluye degustación. Máx. 8 personas.",
    imagen: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 18,
    codigo: "TG003",
    tipo: "Taller grupal",
    nombre: "Taller nutrición para deportistas",
    duracion: "90 min",
    modalidad: "Presencial (grupo)",
    profesional: "Nutricionista",
    precio: 18000,
    stock: 10,
    stockCritico: 2,
    categoria: "Taller grupal",
    descripcion: "Hidratación, nutrición pre y post entrenamiento, suplementación básica. Máx. 12 personas.",
    imagen: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=500&auto=format&fit=crop&q=60"
  }
];

export const obtenerProductos = () => {
  const guardados = localStorage.getItem('nutrivida_productos_db');
  if (guardados !== null) {
    return JSON.parse(guardados);
  }
  localStorage.setItem('nutrivida_productos_db', JSON.stringify(productosIniciales));
  return productosIniciales;
};

export const agregarProducto = (nuevoProd) => {
  const productos = obtenerProductos();
  const idMax = productos.length > 0 ? Math.max(...productos.map(p => p.id)) : 0;
  const productoConId = { ...nuevoProd, id: idMax + 1 };
  const actualizados = [...productos, productoConId];
  localStorage.setItem('nutrivida_productos_db', JSON.stringify(actualizados));
  return actualizados;
};

export const actualizarProducto = (id, productoActualizado) => {
  const productos = obtenerProductos();
  const actualizados = productos.map(p => p.id === id ? { ...p, ...productoActualizado } : p);
  localStorage.setItem('nutrivida_productos_db', JSON.stringify(actualizados));
  return actualizados;
};

export const eliminarProducto = (id) => {
  const productos = obtenerProductos();
  const actualizados = productos.filter(p => p.id !== id);
  localStorage.setItem('nutrivida_productos_db', JSON.stringify(actualizados));
  return actualizados;
};