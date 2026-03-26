import { useEffect, useRef, useState } from 'react';
import { Toast } from 'bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/CartPage.css';

interface CartPageState {
  toastMessage?: string;
}

// Displays the shopping cart with line items, subtotals, and a total.
// Shows a Bootstrap Toast notification when an item was just added.
function CartPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, removeFromCart } = useCart();
  const [toastMessage, setToastMessage] = useState('');
  const toastRef = useRef<HTMLDivElement>(null);

  // Extract and clear the toast message passed via navigation state
  useEffect(() => {
    const message = (location.state as CartPageState | null)?.toastMessage;

    if (!message) return;

    setToastMessage(message);
    navigate(location.pathname, { replace: true, state: null });
  }, [location.pathname, location.state, navigate]);

  // Show the Bootstrap Toast whenever a new toast message is set
  useEffect(() => {
    if (!toastMessage || !toastRef.current) return;

    const toast = Toast.getOrCreateInstance(toastRef.current, {
      autohide: true,
      delay: 2500,
    });

    toast.show();
  }, [toastMessage]);

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className='cart-page'>
      {toastMessage && (
        <div
          className='toast-container position-fixed top-0 end-0 p-3'
          aria-live='polite'
          aria-atomic='true'
        >
          <div
            ref={toastRef}
            className='toast text-bg-success border-0'
            role='status'
          >
            <div className='d-flex align-items-center'>
              <div className='toast-body'>{toastMessage}</div>
              <button
                type='button'
                className='btn-close btn-close-white me-2 m-auto'
                data-bs-dismiss='toast'
                aria-label='Close'
              />
            </div>
          </div>
        </div>
      )}

      <header className='bg-primary border-bottom shadow-sm'>
        <div className='container py-4 text-white'>
          <p className='mb-1 text-uppercase fw-semibold small text-white-50'>
            Your Shopping
          </p>
          <h1 className='mb-0 display-6 fw-semibold'>Cart</h1>
        </div>
      </header>

      <div className='container py-4'>
        <div className='row g-4'>
          <div className='col-lg-8'>
            <div className='card border-0 shadow-sm'>
              <div className='card-body p-0'>
                {cart.length === 0 ? (
                  <div className='text-center py-5'>
                    <p className='text-secondary mb-0 fs-5'>Your cart is empty</p>
                  </div>
                ) : (
                  <ul className='list-group list-group-flush'>
                    {cart.map((item) => {
                      const subtotal = item.price * item.quantity;

                      return (
                        <li key={item.bookId} className='list-group-item px-4 py-3'>
                          <div className='cart-item'>
                            <div className='cart-item-info'>
                              <h6 className='mb-1 fw-semibold'>{item.title}</h6>
                              <small className='text-secondary'>
                                {item.quantity} x ${item.price.toFixed(2)}
                              </small>
                            </div>
                            <div className='d-flex align-items-center gap-3'>
                              <span className='fw-semibold'>${subtotal.toFixed(2)}</span>
                              <button
                                className='btn btn-sm btn-outline-danger'
                                onClick={() => removeFromCart(item.bookId)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className='col-lg-4'>
            <div className='card border-0 shadow-sm'>
              <div className='card-body'>
                <h5 className='card-title fw-semibold mb-3'>Order Summary</h5>
                <hr />
                <div className='d-flex justify-content-between align-items-center mb-4'>
                  <span className='text-secondary'>Total</span>
                  <span className='fs-4 fw-bold'>${totalAmount.toFixed(2)}</span>
                </div>
                <div className='d-grid gap-2'>
                  <button className='btn btn-outline-secondary' onClick={() => navigate(-1)}>
                    Continue Browsing
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
