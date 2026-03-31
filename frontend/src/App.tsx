import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookListPage from './pages/BookListPage';
import { CartProvider } from './context/CartContext';
import CartPage from './pages/CartPage';
import AdminBookList from './pages/AdminBookList';


function App() {
  return (
    <>
      <CartProvider>
        <Router>
      <Routes>
        <Route path="/" element={<BookListPage/>} />
        <Route path="/books" element={<BookListPage/>} />
        <Route path="/cart" element={<CartPage/>} />
        <Route path="/admin/books" element={<AdminBookList />} />
      </Routes>
    </Router>
      </CartProvider>
    </>
  )
}

export default App
