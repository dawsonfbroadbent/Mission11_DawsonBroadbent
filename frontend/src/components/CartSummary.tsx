import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/CartSummary.css';

// Floating cart summary displayed on the home page showing total price and item count
const CartSummary = () => {
    const navigate = useNavigate();
    const { cart } = useCart();

    // Calculate total price (price × quantity for each item)
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    // Calculate total number of items in the cart
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div
            className="cart-summary"
            onClick={() => navigate('/cart')}
        >
            🛒 {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'} — <strong>${totalAmount.toFixed(2)}</strong>
        </div>
    );
};

export default CartSummary;