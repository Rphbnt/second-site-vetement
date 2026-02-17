
// Récupérer le panier depuis localStorage
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Sauvegarder le panier dans localStorage
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Ajouter un produit au panier
function addProductToCart(product) {
  const cart = getCart();
  cart.push(product);
  saveCart(cart); 
  showCartButton();
}

// Afficher le bouton "Voir mon panier" si le panier contient au moins 1 produit
function showCartButton() {
  const cart = getCart();
  const btn = document.getElementById("cart-btn");
  if (btn && cart.length > 0) {
    btn.style.display = "inline-block";
  }
}


document.addEventListener("DOMContentLoaded", () => {
  showCartButton();

  // Tous les boutons Ajouter au panier
  const buttons = document.querySelectorAll(".add-to-cart");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const productCard = btn.closest(".product-card");
      const product = {
        name: productCard.dataset.name,
        price: parseFloat(productCard.dataset.price),
        image: productCard.dataset.img
      };

      addProductToCart(product);

      const msg = productCard.querySelector("#cart-message");
      if (msg) {
        msg.textContent = "✔ Produit ajouté au panier";
        msg.style.opacity = 1;
        setTimeout(() => { msg.style.opacity = 0; }, 2000);
      }
    });
  });

  // Si on est sur la page panier, afficher le contenu
  const cartContainer = document.getElementById("cart-container");
  const totalEl = document.getElementById("total");
  const payBtn = document.getElementById("pay-btn");

  if (cartContainer && totalEl) {
    const cart = getCart();
    let total = 0;
    cart.forEach(product => {
      total += product.price;
      cartContainer.innerHTML += `
        <div class="cart-item">
          <img src="${product.image}">
          <p>${product.name}</p>
          <strong>${product.price.toFixed(2)} €</strong>
        </div>
      `;
    });
    totalEl.textContent = "Total : " + total.toFixed(2) + " €";

    if (payBtn) {
      payBtn.addEventListener("click", () => {
        alert("💳 Paiement en cours (démo)");
        localStorage.removeItem("cart");
        window.location.reload();
      });
    }
  }
});
