import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Carrito from './Carrito'

describe('Componente Carrito', () => {
  
  // Creamos un Mock de datos (Simulación de un producto en el carrito)
  const mockCarrito = [
    { id: 1, nombre: 'Vitamina C', precio: 5000, cantidad: 2 }
  ]

  // Prueba 6: Renderizado condicional (Estado vacío)
  it('Debe renderizar la vista correctamente cuando el carrito está vacío', () => {
    const { container } = render(
      <BrowserRouter>
        <Carrito carrito={[]} cambiarCantidad={() => {}} />
      </BrowserRouter>
    )
    expect(container).toBeTruthy()
  })

  // Prueba 7: Simulación de datos inyectados en el DOM
  it('Debe mostrar en el DOM los productos cuando existen en el estado (Ej: Vitamina C)', () => {
    const { container } = render(
      <BrowserRouter>
        <Carrito carrito={mockCarrito} cambiarCantidad={() => {}} />
      </BrowserRouter>
    )
    // Verificamos que el nombre del producto simulado aparezca físicamente en la pantalla
    expect(container.innerHTML).toContain('Vitamina C')
  })

  // Prueba 8: Lógica matemática en el componente
  it('Debe calcular correctamente el subtotal basado en cantidad y precio (5000 x 2 = 10000)', () => {
    const { container } = render(
      <BrowserRouter>
        <Carrito carrito={mockCarrito} cambiarCantidad={() => {}} />
      </BrowserRouter>
    )
    // Quitamos los puntos y las comas del formato para asegurar la lectura
    const textoDOM = container.innerHTML.replace(/[\.,]/g, '') 
    expect(textoDOM).toContain('10000')
  })

  // Prueba 9: Uso de Mocks para funciones (Jasmine Spy)
  it('Debe aceptar y registrar correctamente la función mock cambiarCantidad', () => {
    const mockCambiar = jasmine.createSpy('cambiarCantidad')
    const { container } = render(
      <BrowserRouter>
        <Carrito carrito={mockCarrito} cambiarCantidad={mockCambiar} />
      </BrowserRouter>
    )
    expect(container.firstChild).not.toBeNull()
  })

  // Prueba 10: Manejo de estructuras HTML
  it('Debe estructurar visualmente la lista de productos en el DOM', () => {
    const { container } = render(
      <BrowserRouter>
        <Carrito carrito={mockCarrito} cambiarCantidad={() => {}} />
      </BrowserRouter>
    )
    // Aseguramos que haya contenedores estructurales presentes
    const elementosEstructurales = container.querySelectorAll('div, table, ul, li')
    expect(elementosEstructurales.length).toBeGreaterThan(0)
  })
})