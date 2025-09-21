// --- To-Do List with Local Storage ---
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let taskList = document.getElementById("taskList");
  if (taskList) {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      let li = document.createElement("li");
      li.innerHTML = `${task} <button onclick="removeTask(${index})">Delete</button>`;
      taskList.appendChild(li);
    });
  }
}

function addTask() {
  let taskInput = document.getElementById("taskInput");
  if (taskInput.value === "") return;

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(taskInput.value);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskInput.value = "";
  loadTasks();
}

function removeTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

loadTasks();


// --- Products (Filter & Sort) ---
const products = [
  { name: "Smartphone", category: "electronics", price: 500, rating: 4.5 },
  { name: "Laptop", category: "electronics", price: 1200, rating: 4.8 },
  { name: "T-Shirt", category: "clothing", price: 20, rating: 4.2 },
  { name: "Jeans", category: "clothing", price: 40, rating: 4.0 },
  { name: "Headphones", category: "electronics", price: 100, rating: 4.6 }
];

function displayProducts(list) {
  let productList = document.getElementById("productList");
  if (productList) {
    productList.innerHTML = "";
    list.forEach(p => {
      let card = document.createElement("div");
      card.classList.add("product-card");
      card.innerHTML = `
        <h4>${p.name}</h4>
        <p>Category: ${p.category}</p>
        <p>Price: $${p.price}</p>
        <p>Rating: ⭐ ${p.rating}</p>
      `;
      productList.appendChild(card);
    });
  }
}

function filterProducts() {
  let category = document.getElementById("categoryFilter").value;
  let filtered = category === "all" ? products : products.filter(p => p.category === category);
  displayProducts(filtered);
}

function sortProducts() {
  let option = document.getElementById("sortOption").value;
  let sorted = [...products];
  if (option === "priceLowHigh") sorted.sort((a, b) => a.price - b.price);
  if (option === "priceHighLow") sorted.sort((a, b) => b.price - a.price);
  if (option === "ratingHighLow") sorted.sort((a, b) => b.rating - a.rating);
  displayProducts(sorted);
}

displayProducts(products);
