import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className='container'>
      <h2>Cart</h2>
      <div>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {cart.map((item) => {
              const subtotal = item.price * item.quantity;

              return (
                <li key={item.bookId}>
                  {item.title}: ${subtotal.toFixed(2)} ({item.quantity} @ $
                  {item.price.toFixed(2)} each)
                  <button onClick={() => removeFromCart(item.bookId)}>
                    Remove Book
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <h3>Total: ${totalAmount.toFixed(2)}</h3>
      <button>Checkout</button>
      <button onClick={() => navigate(-1)}>Continue Browsing</button>
    </div>
  );
}

export default CartPage;