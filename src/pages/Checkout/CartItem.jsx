import React from 'react';
import './cartItem.css';

const CartItem = ({ item, index, onQuantityChange, onDelete }) => {

  const product = item.product || item;

  const variantIndex = product.selectedVariantIndex ?? 0;
  const variant = product.variants?.[variantIndex];

  const price = Number(variant?.price || product.price || 0);
  const quantity = Number(item.quantity || 1);
  const itemTotal = price * quantity;

  const image = product.image || product.imageUrl || '/placeholder.jpg';
  const name = product.name || 'Product';

  return (
    <div className="cart-item">
      <img
        src={image}
        alt={name}
        className="cart-item-image"
      />

      <div className="item-info">
        <span className="item-name">{name}</span>

        <div className="item-quantity">
          <button onClick={() => onQuantityChange(index, -1)}>-</button>
          <span>{quantity}</span>
          <button onClick={() => onQuantityChange(index, 1)}>+</button>
        </div>
      </div>

      <div className="item-actions">
        <div className="item-price">₹{itemTotal.toFixed(2)}</div>

        <button className="delete-btn" onClick={() => onDelete(index)}>
          🗑️
        </button>
      </div>
    </div>
  );
};

export default CartItem;

// import React from 'react';
// import './cartItem.css';

// const CartItem = ({ item, index, onQuantityChange, onDelete }) => {
//   const product = item.product || item;
//   const variant = product.variants?.[product.selectedVariantIndex ?? 0];
//   const price = Number(variant?.price || product.price || 0);
//   const quantity = Number(item.quantity || 1);
//   const itemTotal = price * quantity;

//   return (
//     <div className="cart-item">
//       <img
//         src={product.image || product.imageUrl || '/placeholder.jpg'}
//         alt={product.name || 'Product'}
//         className="cart-item-image"
//       />

//       <div className="item-info">
//         <span className="item-name">{product.name || 'Product'}</span>
//         <div className="item-quantity">
//           <button onClick={() => onQuantityChange(index, -1)}>-</button>
//           <span>{quantity}</span>
//           <button onClick={() => onQuantityChange(index, 1)}>+</button>
//         </div>
//       </div>

//       <div className="item-actions">
//         <div className="item-price">₹{itemTotal.toFixed(2)}</div>
//         <button className="delete-btn" onClick={() => onDelete(index)}>
//           🗑️
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CartItem;
