// Fonction de mise à jour du prix total
function updateTotal() {
  let total = 0;
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const unitPrice = parseFloat(card.querySelector(".unit-price").textContent.replace("$", "").trim());
    const quantity = parseInt(card.querySelector(".quantity").textContent);
    total += unitPrice * quantity;
  });

  document.querySelector(".total").textContent = `${total} $`;
}

// Initialisation des événements
document.querySelectorAll(".card").forEach(card => {
  const plusBtn = card.querySelector(".fa-plus-circle");
  const minusBtn = card.querySelector(".fa-minus-circle");
  const deleteBtn = card.querySelector(".fa-trash-alt");
  const heartBtn = card.querySelector(".fa-heart");
  const quantityDisplay = card.querySelector(".quantity");

  // Augmenter la quantité
  plusBtn.addEventListener("click", () => {
    quantityDisplay.textContent = parseInt(quantityDisplay.textContent) + 1;
    updateTotal();
  });

  // Diminuer la quantité (pas en dessous de 0)
  minusBtn.addEventListener("click", () => {
    const currentQty = parseInt(quantityDisplay.textContent);
    if (currentQty > 0) {
      quantityDisplay.textContent = currentQty - 1;
      updateTotal();
    }
  });

  // Supprimer un produit
  deleteBtn.addEventListener("click", () => {
    card.closest(".card-body").remove();
    updateTotal();

    // Afficher "panier vide" si plus d'articles
    const remainingItems = document.querySelectorAll(".card");
    if (remainingItems.length === 0) {
      document.querySelector(".list-products").innerHTML = "<h3>Votre panier est vide.</h3>";
    }
  });

  // Liker un produit (toggle cœur rouge)
  heartBtn.addEventListener("click", () => {
    heartBtn.classList.toggle("liked");
    heartBtn.style.color = heartBtn.classList.contains("liked") ? "red" : "black";
  });
});

// Mise à jour initiale du total au chargement
updateTotal();
