import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookListPage from './pages/BookListPage';
import { CartProvider } from './context/CartContext';
import CartPage from './pages/CartPage';


function App() {
  return (
    <>
      <CartProvider>
        <Router>
      <Routes>
        <Route path="/" element={<BookListPage/>} />
        <Route path="/books" element={<BookListPage/>} />
        <Route path="/cart" element={<CartPage/>} />
      </Routes>
    </Router>
      </CartProvider>
    </>
  )
}

export default App
