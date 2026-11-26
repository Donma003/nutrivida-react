import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { esAdmin } from './services/api'

// Páginas
import Home from './pages/Home'
import Productos from './pages/Productos'
import Carrito from './pages/Carrito'
import Login from './pages/Login'
import Registro from './pages/Registro'
import Contacto from './pages/Contacto'
import AdminHome from './pages/AdminHome'
import AdminProductos from './pages/AdminProductos'
import AdminUsuarios from './pages/AdminUsuarios'
import Nosotros from './pages/Nosotros'
import Blogs from './pages/Blogs'
import Categorias from './pages/Categorias'
import Checkout from './pages/Checkout'
import PagoExitoso from './pages/PagoExitoso'
import PagoError from './pages/PagoError'
import AdminCategorias from './pages/AdminCategorias'
import AdminOrdenes from './pages/AdminOrdenes'
import DetalleProducto from './pages/DetalleProducto'

function RutaAdmin({ children }) {
  if (!esAdmin()) {
    return <Navigate to="/login" replace />
  }
  return children
}

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

  const vaciarCarrito = () => setCarrito([])

  const totalUnidades = carrito.reduce((acc, item) => acc + item.cantidad, 0)

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header cantidadCarrito={totalUnidades} />
      <main className="flex-grow-1 container pb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos onAgregar={agregarAlCarrito} />} />
          <Route path="/carrito" element={<Carrito carrito={carrito} cambiarCantidad={cambiarCantidad} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/blog" element={<Blogs />} />
          <Route path="/producto/:id" element={<DetalleProducto onAgregar={agregarAlCarrito} />} />
          <Route path="/categorias" element={<Categorias onAgregar={agregarAlCarrito} />} />
          <Route path="/checkout" element={<Checkout carrito={carrito} vaciarCarrito={vaciarCarrito} />} />
          <Route path="/pago-exitoso" element={<PagoExitoso />} />
          <Route path="/pago-error" element={<PagoError />} />

          {/* Rutas protegidas solo para ADMIN */}
          <Route path="/admin" element={<RutaAdmin><AdminHome /></RutaAdmin>} />
          <Route path="/admin/productos" element={<RutaAdmin><AdminProductos /></RutaAdmin>} />
          <Route path="/admin/usuarios" element={<RutaAdmin><AdminUsuarios /></RutaAdmin>} />
          <Route path="/admin/categorias" element={<RutaAdmin><AdminCategorias /></RutaAdmin>} />
          <Route path="/admin/ordenes" element={<RutaAdmin><AdminOrdenes /></RutaAdmin>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App