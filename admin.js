
document.addEventListener("DOMContentLoaded", function () {
  loadBooks();
});

function goToHome() {
  window.location.href = "index.html";
}

function addBook() {
  let title = document.getElementById("bookTitle").value.trim();
  let price = document.getElementById("bookPrice").value.trim();
  let description = document.getElementById("bookDescription").value.trim();
  let imageInput = document.getElementById("bookImage");
  let imageFile = imageInput.files[0];

  if (title === "" || price === "") {
    alert("Please enter both book title and price.");
    return;
  }

  if (!imageFile) {
    alert("Please select a book image.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    const imageData = event.target.result;

    let books = JSON.parse(localStorage.getItem("books")) || [];
    books.push({ title, price, description, image: imageData });
    localStorage.setItem("books", JSON.stringify(books));

    let bookList = document.getElementById("bookList");
    let li = document.createElement("li");
    li.innerHTML = `
      <div style="text-align: left;">
        <strong>${title}</strong> - Rs ${price}<br>
        <em>${description}</em><br>
        <img src="${imageData}" alt="${title}" style="height: 60px; margin-top: 5px;">
      </div>
      <button onclick="removeBook(this)">Remove</button>`;
    bookList.appendChild(li);

    document.getElementById("bookTitle").value = "";
    document.getElementById("bookPrice").value = "";
    document.getElementById("bookDescription").value = "";
    document.getElementById("bookImage").value = "";
  };
  reader.readAsDataURL(imageFile);
}

function removeBook(button) {
  let li = button.parentElement;
  let title = li.querySelector("strong").textContent;

  li.remove();
  removeBookFromStorage(title);
}

function saveBook(title, price, description, image) {
  let books = JSON.parse(localStorage.getItem("books")) || [];
  books.push({ title, price, description, image });
  localStorage.setItem("books", JSON.stringify(books));
}

function loadBooks() {
  let books = JSON.parse(localStorage.getItem("books")) || [];
  let bookList = document.getElementById("bookList");

  books.forEach(book => {
    let li = document.createElement("li");
    li.innerHTML = `
      <div style="text-align: left;">
        <strong>${book.title}</strong> - Rs ${book.price}<br>
        <em>${book.description || ""}</em><br>
        ${book.image ? `<img src="${book.image}" alt="${book.title}" style="height: 60px; margin-top: 5px;">` : ""}
      </div>
      <button onclick="removeBook(this)">Remove</button>`;
    bookList.appendChild(li);
  });
}

function removeBookFromStorage(title) {
  let books = JSON.parse(localStorage.getItem("books")) || [];
  books = books.filter(book => book.title !== title);
  localStorage.setItem("books", JSON.stringify(books));
}
