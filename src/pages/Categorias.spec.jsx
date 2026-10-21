import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Categorias from './Categorias';

describe('Pruebas del componente Categorias', () => {

  const mockProductos = [
    { id: 1, codigo: 'CN001', nombre: 'Primera consulta nutricional', precio: 35000, stock: 50, categoria: 'Consulta', imagen: '' },
    { id: 6, codigo: 'PL001', nombre: 'Plan pérdida de peso (1 mes)', precio: 65000, stock: 20, categoria: 'Plan especializado', imagen: '' }
  ];

  beforeEach(() => {
    // Alimentar directamente el almacenamiento local que lee el CRUD
    localStorage.setItem('nutrivida_productos_db', JSON.stringify(mockProductos));
  });

  afterEach(() => {
    localStorage.clear();
  });

  // 1. PRUEBA DE RENDERIZADO
  it('1. Renderiza correctamente la lista de categorías', () => {
    render(
      <BrowserRouter>
        <Categorias onAgregar={() => {}} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Nuestras Categorías')).toBeTruthy();
    expect(screen.getByText('Consulta')).toBeTruthy();
    expect(screen.getByText('Plan especializado')).toBeTruthy();
  });

  // 2. PRUEBA DE ESTADO Y RENDERIZADO CONDICIONAL
  it('2. Cambia el estado (state) al seleccionar otra categoría y renderiza condicionalmente', () => {
    render(
      <BrowserRouter>
        <Categorias onAgregar={() => {}} />
      </BrowserRouter>
    );

    const botonPlan = screen.getByText('Plan especializado');
    fireEvent.click(botonPlan);

    expect(screen.getByText('Servicios en: Plan especializado')).toBeTruthy();
    expect(screen.getByText('Plan pérdida de peso (1 mes)')).toBeTruthy();
  });

  // 3. PRUEBA DE EVENTOS Y PROPS
  it('3. Ejecuta el evento de clic y pasa la información mediante props', () => {
    const mockOnAgregar = jasmine.createSpy('onAgregar');

    render(
      <BrowserRouter>
        <Categorias onAgregar={mockOnAgregar} />
      </BrowserRouter>
    );

    const botonesAñadir = screen.getAllByText('Añadir al carrito');
    fireEvent.click(botonesAñadir[0]);

    expect(mockOnAgregar).toHaveBeenCalled();
  });

  // 4. PRUEBA DE RENDERIZADO CONDICIONAL (Vacío)
  it('4. Renderiza mensaje condicional si la categoría no tiene productos', () => {
    // Vaciamos el localStorage para simular un estado sin datos
    localStorage.setItem('nutrivida_productos_db', JSON.stringify([]));

    render(
      <BrowserRouter>
        <Categorias onAgregar={() => {}} />
      </BrowserRouter>
    );

    expect(screen.getByText(/No hay servicios disponibles/i)).toBeTruthy();
  });

});