// Same product data used on form.html, needed here to turn the submitted
// product id back into a readable product name.
const products = [
    { id: 1, name: "Faucet" },
    { id: 2, name: "Water Heater" },
    { id: 3, name: "Dishwasher" },
    { id: 4, name: "Garbage Disposal" }
];

// Readable labels for the checkbox fields, keyed by their `name` attribute
// from form.html.
const featureLabels = {
    easyInstall: "Easy Installation",
    durable: "Durable",
    energyEfficient: "Energy Efficient",
    goodValue: "Good Value"
};

function getProductName(id) {
    const match = products.find((product) => String(product.id) === id);
    return match ? match.name : "Not specified";
}

function displaySubmittedData() {
    const params = new URLSearchParams(window.location.search);

    // Product
    const productId = params.get("product");
    document.getElementById("displayProduct").textContent = productId
        ? getProductName(productId)
        : "Not specified";

    // Rating
    const rating = params.get("rating");
    document.getElementById("displayRating").textContent = rating
        ? `${rating} out of 5 stars`
        : "Not specified";

    // Date of installation
    const installDate = params.get("installDate");
    document.getElementById("displayDate").textContent = installDate || "Not specified";

    // Useful features — each checked box shows up as its own name=value pair.
    // Unchecked boxes simply don't appear in the query string at all.
    const checkedFeatures = Object.keys(featureLabels).filter((key) => params.has(key));
    document.getElementById("displayFeatures").textContent = checkedFeatures.length
        ? checkedFeatures.map((key) => featureLabels[key]).join(", ")
        : "None selected";

    // Written review (optional)
    const review = params.get("review");
    document.getElementById("displayReview").textContent = review && review.trim()
        ? review
        : "No written review provided";

    // User name (optional)
    const userName = params.get("userName");
    document.getElementById("displayName").textContent = userName && userName.trim()
        ? userName
        : "Anonymous";
}

function updateReviewCount() {
    let count = localStorage.getItem("reviewCount");
    count = count ? parseInt(count, 10) + 1 : 1;
    localStorage.setItem("reviewCount", count);
    document.getElementById("reviewCount").textContent = count;
}

document.addEventListener("DOMContentLoaded", () => {
    displaySubmittedData();
    updateReviewCount();
});