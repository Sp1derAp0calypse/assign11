import './App.css';
import BookPage from './pages/BookPage';
import Cart from './pages/Cart';
import { CartProvider } from './context/CartContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminBooksPage from './pages/AdminBookPage';

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BookPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/adminBooks" element={<AdminBooksPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
