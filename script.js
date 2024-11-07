//*********************Fetch data from API************************

const productContainer = document.getElementById("product-container");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

let products = [];

// Fetch all products
fetch("https://dummyjson.com/products")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    products = data.products; // Store products
    renderProducts(products); // Display products
  })
  .catch((error) => {
    console.error("There has been a problem with your fetch operation:", error);
  });

// Function to render products
function renderProducts(products) {
  productContainer.innerHTML = "";
  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}" />
      <h3>${product.title}</h3>
      <div class="rating">${"★".repeat(Math.round(product.rating))}<span> ${
      product.rating
    }/5</span></div>
      <p class="price">$${product.price}</p>
      <p class="id">ID: ${product.id}</p>
    `;
    productContainer.appendChild(productCard);
  });
}

// Search button click event
searchButton.addEventListener("click", () => {
  const searchValue = searchInput.value;
  const filteredProducts = products.filter(
    (product) => product.id.toString() === searchValue
  );
  renderProducts(filteredProducts);
});

// Debounce function
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
}

// Fetch products based on search input
const fetchSearchResults = (category) => {
  fetch(`https://dummyjson.com/products/category/${category}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      renderProducts(data.products);
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
};

// // Input event listener with debounce
// searchInput.addEventListener(
//   "input",
//   debounce((event) => {
//     const searchValue = event.target.value;
//     if (searchValue.length >= 1) {
//       fetchSearchResults(searchValue);
//     } else {
//       renderProducts(products); // Show all products if search input is empty
//     }
//   }, 300)
// ); // Adjust delay as necessary
