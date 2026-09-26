const products = [
    { id: 1, name: "Faucet" },
    { id: 2, name: "Water Heater" },
    { id: 3, name: "Dishwasher" },
    { id: 4, name: "Garbage Disposal" }
];

const selectElement = document.getElementById("product");

products.forEach((product) => {
    const option = document.createElement("option");
    option.value = product.id;      // value = id, per assignment spec
    option.textContent = product.name; // display text = name
    selectElement.appendChild(option);
});