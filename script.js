document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("searchButton");
    const searchInput = document.getElementById("searchInput");

    searchButton.addEventListener("click", () => {
        const query = searchInput.value.toLowerCase().trim();

        // Redirect to the page based on searched query
        if (query === "mens") {
            window.location.href = "mens.html";
        } else if (query === "womens") {
            window.location.href = "women.html";
        } else if (query === "kids") {
            window.location.href = "kids.html";
        } else if (query === "beauty") {
            window.location.href = "beauty.html";
        } else if (query === "accessories") {
            window.location.href = "accessories.html";
        } else {
            alert("Category is not available yet.");
        }
    });
});

// Carousel
let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-slide");

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove("active");
        if (i === index) slide.classList.add("active");
    });
}

function startCarousel() {
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 4000); // Change slide every 3 seconds
}

// Initialize the carousel
showSlide(currentSlide);
startCarousel();

document.addEventListener("DOMContentLoaded", () => {
    // Handle Add to Cart functionality
    const addToCartButtons = document.querySelectorAll(".add-to-cart");

    addToCartButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const card = event.target.closest(".card");

            // Extract product details dynamically
            const title = card.dataset.title;
            const description = card.dataset.description;
            const price = card.dataset.price;

            // Add to cart
            addToCart(title, description, price);
        });
    });

    // Add to cart function
    function addToCart(title, description, price) {
        // Retrieve existing cart items from localStorage
        const cart = JSON.parse(localStorage.getItem("cartItems")) || [];

        // Add the new item to the cart
        cart.push({ title, description, price });

        // Save the updated cart back to localStorage
        localStorage.setItem("cartItems", JSON.stringify(cart));

        // Redirect to Add to Cart page
        window.location.href = "add-to-cart.html";
    }
});

function displayCartItems() {
    // Retrieve cart items from localStorage
    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Get the table body
    const tableBody = document.querySelector("#cartTable tbody");
    tableBody.innerHTML = ""; // Clear existing rows

    // Populate table rows with cart items
    cart.forEach((item, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.title}</td>
            <td>${item.description}</td>
            <td>${item.price}</td>
            <td><button onclick="deleteItem(${index})">Delete</button></td>
        `;
        tableBody.appendChild(row);
    });

    if (cart.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="4">Your cart is empty</td></tr>`;
    }
}

// Function to delete an item from the cart
function deleteItem(index) {
    // Retrieve cart items from localStorage
    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Remove the selected item
    cart.splice(index, 1);

    // Update localStorage
    localStorage.setItem("cartItems", JSON.stringify(cart));

    // Refresh the table
    displayCartItems();
}

// Call the display function when the page loads
document.addEventListener("DOMContentLoaded", displayCartItems);