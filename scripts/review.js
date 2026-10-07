const products = [
    { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
    { id: "fc-2050", name: "power laces", averagerating: 4.7 },
    { id: "fs-1987", name: "time circuits", averagerating: 3.5 },
    { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
    { id: "jj-1969", name: "warp equalizer", averagerating: 5.0 }
];

const featureLabels = {
    easyInstall: "Easy Installation",
    durable: "Durable",
    energyEfficient: "Energy Efficient",
    goodValue: "Good Value"
};

const params = new URLSearchParams(window.location.search);

function getProductName(id) {
    const match = products.find((product) => String(product.id) === id);
    return match ? match.name : "Not specified";
}

function displaySubmittedData() {
    const productId = params.get("product");
    document.getElementById("displayProduct").textContent = productId
        ? getProductName(productId)
        : "Not specified";

    const rating = params.get("rating");
    document.getElementById("displayRating").textContent = rating
        ? `${rating} out of 5 stars`
        : "Not specified";

    document.getElementById("displayDate").textContent =
        params.get("installDate") || "Not specified";

    const checked = Object.keys(featureLabels).filter((key) => params.has(key));
    document.getElementById("displayFeatures").textContent = checked.length
        ? checked.map((key) => featureLabels[key]).join(", ")
        : "None selected";

    const review = params.get("review");
    document.getElementById("displayReview").textContent =
        review && review.trim() ? review : "No written review provided";

    const userName = params.get("userName");
    document.getElementById("displayName").textContent =
        userName && userName.trim() ? userName : "Anonymous";
}

function updateReviewCount() {
    let count = 0;
    try {
        count = parseInt(localStorage.getItem("reviewCount"), 10) || 0;

        // Count only real submissions, and not a refresh of the same one
        const query = window.location.search;
        if (params.has("product") && sessionStorage.getItem("lastCounted") !== query) {
            count += 1;
            localStorage.setItem("reviewCount", count);
            sessionStorage.setItem("lastCounted", query);
        }
    } catch (error) {
        console.warn("Storage unavailable:", error);
    }
    document.getElementById("reviewCount").textContent = count;
}

displaySubmittedData();
updateReviewCount();