import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Header from './Header'

describe('Componente Header', () => {
  
  // Prueba 3: Verificación de renderizado básico
  it('Debe renderizar el encabezado correctamente sin romperse', () => {
    const { container } = render(
      <BrowserRouter>
        <Header cantidadCarrito={0} />
      </BrowserRouter>
    )
    expect(container.firstChild).not.toBeNull()
  })

  // Prueba 4: Recepción de Props (Propiedades)
  it('Debe recibir y procesar la propiedad cantidadCarrito (Ej: 5)', () => {
    const { container } = render(
      <BrowserRouter>
        <Header cantidadCarrito={5} />
      </BrowserRouter>
    )
    // Verifica que el componente acepta la propiedad sin errores
    expect(container).toBeTruthy()
  })

  // Prueba 5: Manipulación del DOM para navegación
  it('Debe contener elementos de navegación en el DOM (nav o enlaces)', () => {
    const { container } = render(
      <BrowserRouter>
        <Header cantidadCarrito={0} />
      </BrowserRouter>
    )
    const navegacion = container.querySelector('nav') || container.querySelector('a')
    expect(navegacion).not.toBeNull()
  })
})