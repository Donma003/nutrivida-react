import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Productos from './Productos'
import * as crud from '../data/productosCRUD.js' 

describe('Componente Productos', () => {

  const mockProductos = [
    { id: 1, codigo: 'CN001', nombre: 'Primera consulta nutricional', descripcion: 'Prueba', precio: 35000, stock: 50, stockCritico: 5, categoria: 'Consulta', imagen: '' }
  ];

  beforeEach(() => {
    spyOn(crud, 'obtenerProductos').and.returnValue(mockProductos);
  });
  
  it('Debe renderizar correctamente el título del catálogo', () => {
    render(
      <BrowserRouter>
        <Productos onAgregar={() => {}} />
      </BrowserRouter>
    )
    
    const titulo = screen.getByText('Nuestros Servicios y Planes')
    expect(titulo).not.toBeNull()
  })

  it('Debe llamar a la función onAgregar al hacer clic en "Añadir al carrito"', () => {
    const mockOnAgregar = jasmine.createSpy('onAgregar')
    
    render(
      <BrowserRouter>
        <Productos onAgregar={mockOnAgregar} />
      </BrowserRouter>
    )
    
    const botonesAgregar = screen.getAllByText('Añadir al carrito')
    fireEvent.click(botonesAgregar[0])
    
    expect(mockOnAgregar).toHaveBeenCalled()
    // Usamos objectContaining para que no sea tan estricto con todos los campos
    expect(mockOnAgregar).toHaveBeenCalledWith(jasmine.objectContaining({ id: 1, nombre: 'Primera consulta nutricional' }))
  })
})