document.addEventListener("DOMContentLoaded", function () {
    const books = [
        { id: 1, title: "The Art City", category: "non-fiction", price: 250, image: "image/book-1.png", rating: 4.2, description: "A religious philosopher presents his reflections..." },
        { id: 2, title: "Thanks In Everything", category: "non-fiction", price: 300, image: "image/book-2.png", rating: 4.6, description: "Encourages cultivating a life of thankfulness..." },
        { id: 3, title: "Your Name", category: "fiction", price: 150, image: "image/book-3.png", rating: 4.9, description: "Two teenagers share a profound, magical connection..." },
        { id: 4, title: "Art Of War", category: "non-fiction", price: 200, image: "image/book-4.png", rating: 4.5, description: "The Art of War is an ancient Chinese military treatise..." },
        { id: 5, title: "Music!", category: "non-fiction", price: 350, image: "image/book-5.png", rating: 4.1, description: "a global, bottom-up history of music..." },
        { id: 6, title: "Brief History of Time", category: "science", price: 180, image: "image/book-6.png", rating: 4.8, description: "A Brief History of Time by Stephen Hawking..." },
        { id: 7, title: "Homo Sapiens", category: "science", price: 220, image: "image/book-7.png", rating: 4.4, description: "A Brief History of Humankind by Yuval Noah Harari..." },
        { id: 8, title: "Obama's Adventures", category: "non-fiction", price: 275, image: "image/book-8.png", rating: 3.9, description: "The Adventures of Obama comic series..." },
        { id: 9, title: "Art of Life", category: "science", price: 190, image: "image/book-9.png", rating: 4.0, description: "The inspiration of Ernest Holmes..." },
        { id: 10, title: "Retro", category: "non-fiction", price: 260, image: "image/book-10.png", rating: 3.7, description: "Lighthearted competition to live without modern tech..." }
    ];

    const cartCount = document.getElementById("cart-count");

    function updateCartCounter() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        if (cartCount) cartCount.textContent = cart.length;
    }

    function updateWishlistCounter() {
        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        const countElement = document.getElementById("wishlist-count");
        if (countElement) countElement.textContent = wishlist.length;
    }

    function isInWishlist(bookId) {
        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        return wishlist.some(item => item.id == bookId);
    }

    function toggleWishlist(book) {
        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        const exists = wishlist.some(item => item.id == book.id);
        if (exists) {
            wishlist = wishlist.filter(item => item.id != book.id);
        } else {
            wishlist.push(book);
        }
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        updateWishlistCounter();
    }

    function animateHeart(icon) {
        icon.classList.add("bounce");
        setTimeout(() => icon.classList.remove("bounce"), 400);
    }

    function renderBooks(filteredBooks) {
        const bookList = document.getElementById("book-list");
        bookList.innerHTML = "";
        filteredBooks.forEach(book => {
            const stars = Math.floor(book.rating);
            const half = book.rating % 1 >= 0.5 ? "★" : "";
            const starHTML = "★".repeat(stars) + half + "☆".repeat(5 - stars - (half ? 1 : 0));
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            const inCart = cart.some(item => item.id == book.id);
            const inWishlist = isInWishlist(book.id);

            const bookDiv = document.createElement("div");
            bookDiv.classList.add("book");
            bookDiv.innerHTML = `
    <div style="display: flex; gap: 20px; position: relative;">
        <span class="wishlist-icon wishlist-top-right ${inWishlist ? 'active' : ''}" data-id="${book.id}" title="Add to Wishlist">${inWishlist ? '❤️' : '🤍'}</span>
        <img src="${book.image}" alt="${book.title}">
        <div class="book-details">
            <div>
                <span class="badge">${book.category}</span>
                <h4>${book.title}</h4>
                <p class="desc">Description:<br>"${book.description}"</p>
            </div>
            <div class="book-bottom">
                <div class="star-rating">${starHTML}</div>
                <div class="price-cart">
                    <p style="margin: 5px 0;">Price: ₹${book.price}</p>
                    <button class="add-to-cart" ${inCart ? "disabled" : ""} data-id="${book.id}" data-title="${book.title}" data-price="${book.price}" data-image="${book.image}">${inCart ? "Added" : "Add to Cart"}</button>
                </div>
            </div>
        </div>
    </div>
`;
            bookList.appendChild(bookDiv);
        });
    }

    function applyFilters() {
        const term = document.getElementById("searchBar").value.toLowerCase();
        const category = document.getElementById("category-filter").value;
        const minPrice = parseInt(document.getElementById("min-price").value) || 0;
        const maxPrice = parseInt(document.getElementById("max-price").value) || Infinity;
        const sort = document.getElementById("sort-options").value;

        let filtered = books.filter(book =>
            (
                book.title.toLowerCase().includes(term) ||
                book.description.toLowerCase().includes(term) ||
                book.category.toLowerCase().includes(term)
            ) &&
            (category === "all" || book.category === category) &&
            (book.price >= minPrice && book.price <= maxPrice)
        );

        switch (sort) {
            case "price-asc": filtered.sort((a, b) => a.price - b.price); break;
            case "price-desc": filtered.sort((a, b) => b.price - a.price); break;
            case "title-asc": filtered.sort((a, b) => a.title.localeCompare(b.title)); break;
            case "title-desc": filtered.sort((a, b) => b.title.localeCompare(a.title)); break;
            case "rating-desc": filtered.sort((a, b) => b.rating - a.rating); break;
        }

        renderBooks(filtered);
        document.getElementById("noResults").style.display = filtered.length === 0 ? "block" : "none";
    }

    function resetFilters() {
        document.getElementById("searchBar").value = "";
        document.getElementById("category-filter").value = "all";
        document.getElementById("min-price").value = "";
        document.getElementById("max-price").value = "";
        document.getElementById("sort-options").value = "default";
        applyFilters();
    }

    document.getElementById("searchBar").addEventListener("input", applyFilters);
    document.getElementById("apply-filter").addEventListener("click", applyFilters);
    document.getElementById("sort-options").addEventListener("change", applyFilters);

    document.addEventListener("click", function (event) {
        // Add to Cart
        if (event.target.classList.contains("add-to-cart")) {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            const book = {
                id: event.target.dataset.id,
                title: event.target.dataset.title,
                price: event.target.dataset.price,
                image: event.target.dataset.image
            };
            cart.push(book);
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCounter();
            applyFilters();
        }

        // Wishlist toggle
        if (event.target.classList.contains("wishlist-icon")) {
            const id = event.target.dataset.id;
            const book = books.find(b => b.id == id);
            toggleWishlist(book);
            animateHeart(event.target);
            event.target.classList.toggle("active");
            event.target.textContent = isInWishlist(book.id) ? "❤️" : "🤍";
        }
    });

    updateCartCounter();
    updateWishlistCounter();

    // ✅ Pre-fill search from URL if exists
    const params = new URLSearchParams(window.location.search);
    const preSearch = params.get("search");
    if (preSearch) {
        const searchBar = document.getElementById("searchBar");
        if (searchBar) {
            searchBar.value = preSearch;
        }
    }

    applyFilters(); // 🔍 trigger search on page load
});


// === Moved from shop.html ===
// 📌 Clicking anywhere in the search bar should either focus or search
document.addEventListener("DOMContentLoaded", function () {
    const searchWrapper = document.getElementById("searchBar");
    if (!searchWrapper) return;

    const parent = searchWrapper.parentElement;

    parent.addEventListener("click", function (e) {
        if (e.target !== searchWrapper) {
            const val = searchWrapper.value.trim();
            if (val.length === 0) {
                searchWrapper.focus();
            } else {
                searchWrapper.dispatchEvent(new Event("input"));
            }
        }
    });
});

// === 🎤 Voice Search Feature with SVG Mic ===
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (window.SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.interimResults = false;
    recognition.lang = "en-IN";

    const micBtn = document.getElementById("voiceBtn");
    const micIcon = document.getElementById("micIcon");
    const searchBar = document.getElementById("searchBar");

    micBtn.addEventListener("click", () => {
        recognition.start();
        micIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="red" viewBox="0 0 24 24"><path d="M12 14q-.825 0-1.412-.587Q10 12.825 10 12V6q0-.825.588-1.412Q11.175 4 12 4q.825 0 1.413.588Q14 5.175 14 6v6q0 .825-.587 1.413Q12.825 14 12 14Zm-1 7v-3.075q-2.875-.35-4.437-2.238Q5 13.8 5 11.25h2q0 2.075 1.463 3.413Q9.925 16 12 16q2.075 0 3.538-1.337Q17 13.325 17 11.25h2q0 2.55-1.562 4.437Q15.875 17.55 13 17.9V21Zm1-9Z"/></svg>`;
        micBtn.style.transform = "scale(1.3)";
    });

    recognition.addEventListener("result", (event) => {
        const transcript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join("");

        searchBar.value = transcript;
        searchBar.dispatchEvent(new Event("input"));
    });

    recognition.addEventListener("end", () => {
        micIcon.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="#305CDE" viewBox="0 0 24 24">
  <path d="M12 14q-.825 0-1.412-.587Q10 12.825 10 12V6q0-.825.588-1.412Q11.175 4 12 4q.825 0 1.413.588Q14 5.175 14 6v6q0 .825-.587 1.413Q12.825 14 12 14Zm-1 7v-3.075q-2.875-.35-4.437-2.238Q5 13.8 5 11.25h2q0 2.075 1.463 3.413Q9.925 16 12 16q2.075 0 3.538-1.337Q17 13.325 17 11.25h2q0 2.55-1.562 4.437Q15.875 17.55 13 17.9V21Zm1-9Z"/>
</svg>
`;
        micBtn.style.transform = "scale(1)";
    });
} else {
    console.warn("Speech recognition not supported in this browser.");
    const micBtn = document.getElementById("voiceBtn");
    if (micBtn) micBtn.style.display = "none";
}