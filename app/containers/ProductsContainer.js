'use strict';
import { connect } from 'react-redux';
import Products from '../components/Products';

function unAuthAddToCart (product) {
  const order = JSON.parse(window.localStorage.getItem('order'));
  let items;
  if (order) {
    order.items.push({
      quantity: 1,
      productId: product.id,
      product
    });
    items = order.items;
    console.log('items', order.items);
  } else {
    items = [
      {
        quantity: 1,
        productId: product.id,
        product
      }
    ];
  }

  window.localStorage.setItem('order', JSON.stringify({
    status: 'in cart',
    items
  }));

  console.log('STORAGE', JSON.parse(window.localStorage.order));
}

const mapStateToProps = (state, ownProps) => {
  const allProducts = state.products.allProducts;
  const filteredProducts = state.products.filteredProducts;

  return { allProducts, filteredProducts, unAuthAddToCart };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);


// Example:
// localStorage.order = {
//   status: 'in cart',
//   items: [
//     {
//       quantity: 1,
//       price: 12,
//       productId: 0,
//       product: {
//         id: 1,
//         name: "asdf",
//         category: "asdf",
//         tag: "asdf",
//         imageUrl: "asdf",
//         price: 123
//       }
//     }
//   ]
// }
