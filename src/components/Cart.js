import { useCart } from '../utils/cartContext';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div style={{ border: '1px solid black', padding: '10px', marginTop: '20px' }}>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map(item => (
          <div key={item.id} style={{ marginBottom: '10px' }}>
            <h3>{item.name}</h3>
            <p>Price: ${item.price}</p>
            <p>
              Quantity:
              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                style={{ width: '50px', marginLeft: '10px' }}
              />
            </p>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        ))
      )}
      <h3>Total: ${calculateTotal()}</h3>
    </div>
  );
}
