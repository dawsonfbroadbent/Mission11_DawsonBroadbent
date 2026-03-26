import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookListPage from './pages/BookListPage';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookListPage/>} />
        <Route path="/books" element={<BookListPage/>} />
      </Routes>
    </Router>
  )
}

export default App
