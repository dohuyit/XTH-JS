/*!
 * Start Bootstrap - Shop Homepage v5.0.6 (https://startbootstrap.com/template/shop-homepage)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
 */
// This file is intentionally blank
// Use this file to add JavaScript to your project

const getProducts = async (products) => {
  try {
    const res = await fetch("http://localhost:3000/products");
    const dataProducts = await res.json();
    console.log(dataProducts);
    dataProducts.forEach((product) => {
      const divElm = document.createElement("div");
      divElm.classList.add("col");
      divElm.classList.add("mb-5");
      divElm.innerHTML = `
                        <div class="card h-100">
                            <!-- Product image-->
                            <img class="card-img-top" src="${product.image}" alt="..." />
                            <!-- Product details-->
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <!-- Product name-->
                                    <h5 class="fw-bolder">${product.name}</h5>
                                    <!-- Product price-->
                                    ${product.price}
                                </div>
                            </div>
                            <!-- Product actions-->
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="detail.html?id=${product.id}">Chi tiết sản phẩm</a></div>
                            </div>
                        </div>
        `;
      products.append(divElm);
    });
  } catch (error) {
    console.log(error);
  }
};

const getProductsById = async (image, infor, id) => {
  try {
    const res = await fetch(`http://localhost:3000/products/${id}`);
    const productOne = await res.json();
    image.innerHTML = `
    <img src="${productOne.image}">
    `;
    infor.innerHTML = `
     <h1>${productOne.name}</h1>
     <span>${productOne.price}</span>
     <p>${productOne.description}</p>
     <button onclick="addToCart('${productOne.id}',1)" class="btn btn-danger">Thêm vào giỏ hàng</button>
    `;
  } catch (error) {}
};

// const addToCart = (id, quantity) => {
//   const cart = localStorage.getItem("cart");
//   if (cart) {
//     const productToCart = JSON.parse(cart);
//     const check = productToCart.filter((product) => {
//       product.productId == id;
//     });
//     if (check.length > 0) {
//       const productUpdate = productToCart.map((product) => {
//         if (product.productId == id) {
//           product.quantity = product.quantity + quantity;
//         }
//         return product;
//       });
//       localStorage.setItem("cart", JSON.stringify(productUpdate));
//     } else {
//       const newItem = {
//         productId: id,
//         quantity: quantity,
//       };
//       localStorage.setItem("cart", JSON.stringify([...productToCart, newItem]));
//     }
//   } else {
//     const newItem = {
//       productId: id,
//       quantity: quantity,
//     };
//     localStorage.setItem("cart", JSON.stringify([newItem]));
//   }
//   console.log(cart);
//   totalQuanlityCart();
// };

// const totalQuanlityCart = () => {
//   const badge = document.querySelector("#navbarSupportedContent .badge");
//   const cart = localStorage.getItem("cart");
//   if (cart) {
//     const items = JSON.parse(cart);
//     const total = items.reduce((value, item) => {
//       return value + item.quantity;
//     }, 0);
//     badge.innerHTML = `${total}`;
//   } else {
//     badge.innerHTML = "0";
//   }
// };
// totalQuanlityCart();

const addToCart = (id, quantity) => {
  // Check giỏ hàng tồn tại hay chưa
  const cart = localStorage.getItem("cart");
  if (cart) {
    // parse giỏ hàng
    const items = JSON.parse(cart);
    const check = items.filter((item) => item.productId == id);
    if (check.length > 0) {
      const newItem = items.map((item) => {
        if (item.productId == id) {
          item.quantity = item.quantity + quantity;
        }
        return item;
      });
      localStorage.setItem("cart", JSON.stringify(newItem));
    } else {
      const newItem = {
        productId: id,
        quantity: quantity,
      };
      localStorage.setItem("cart", JSON.stringify([...items, newItem]));
    }
  } else {
    const newItem = {
      productId: id,
      quantity: quantity,
    };
    localStorage.setItem("cart", JSON.stringify([newItem]));
  }
  console.log(cart);
  TotalQuantityCart();
};
const TotalQuantityCart = () => {
  const badge = document.querySelector("#navbarSupportedContent .badge");
  // Check giỏ hàng tồn tại hay chưa
  const cart = localStorage.getItem("cart");
  if (cart) {
    const items = JSON.parse(cart);
    const total = items.reduce((value, item) => {
      return value + item.quantity;
    }, 0);
    badge.innerHTML = `${total}`;
  } else {
    badge.innerHTML = `0`;
  }
};
TotalQuantityCart();
