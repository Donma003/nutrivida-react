import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

// Importamos todas las páginas que creaste
import Home from './pages/Home'
import Productos from './pages/Productos'
import Carrito from './pages/Carrito'
import Login from './pages/Login'
import Registro from './pages/Registro'
import Contacto from './pages/Contacto'
import AdminHome from './pages/AdminHome' // La crearemos en el paso 2

function App() {
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem('carritoNutriVida')
    return guardado ? JSON.parse(guardado) : []
  })

  useEffect(() => {
    localStorage.setItem('carritoNutriVida', JSON.stringify(carrito))
  }, [carrito])

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id)
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        )
      }
      return [...prev, { ...producto, cantidad: 1 }]
    })
  }

  const cambiarCantidad = (id, cambio) => {
    setCarrito((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nueva = item.cantidad + cambio
          return nueva > 0 ? { ...item, cantidad: nueva } : null
        }
        return item
      }).filter(Boolean)
    )
  }

  const totalUnidades = carrito.reduce((acc, item) => acc + item.cantidad, 0)

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header cantidadCarrito={totalUnidades} />
      <main className="flex-grow-1 container pb-4">
        <Routes>
          {/* Aquí conectamos las rutas con tus archivos reales */}
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos onAgregar={agregarAlCarrito} />} />
          <Route path="/carrito" element={<Carrito carrito={carrito} cambiarCantidad={cambiarCantidad} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/admin" element={<AdminHome />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App