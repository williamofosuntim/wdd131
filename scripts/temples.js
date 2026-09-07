const menuButton = document.getElementById("menu");
const nav = document.querySelector("nav");

menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.textContent = isOpen ? "X" : "☰";
});

// Footer dates
const year = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

const today = new Date();
year.textContent = today.getFullYear();
lastModified.textContent = `Last Modification: ${document.lastModified}`;