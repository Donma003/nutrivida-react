import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Productos from './Productos'

describe('Componente Productos', () => {
  
  // Prueba 1: Manipulación y lectura del DOM
  it('Debe renderizar correctamente el título del catálogo', () => {
    render(
      <BrowserRouter>
        <Productos onAgregar={() => {}} />
      </BrowserRouter>
    )
    
    const titulo = screen.getByText('Catálogo de Productos')
    expect(titulo).not.toBeNull()
  })

  // Prueba 2: Uso de Mocks (Simulaciones)
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
  })
})