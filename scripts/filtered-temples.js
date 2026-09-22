/* =========================================================
   filtered-temples.js
   - Hamburger menu toggle (unchanged from temples.js)
   - Footer year / last-modified (unchanged from temples.js)
   - NEW: temple data array, dynamic figure rendering,
     and Home/Old/New/Large/Small filtering
   ========================================================= */

/* ---------- Hamburger menu (unchanged) ---------- */

const menuButton = document.getElementById("menu");
const nav = document.querySelector("nav");

menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.textContent = isOpen ? "X" : "☰";
});

/* ---------- Footer dates (unchanged) ---------- */

const year = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

const today = new Date();
year.textContent = today.getFullYear();
lastModified.textContent = `Last Modification: ${document.lastModified}`;

/* ---------- Temple data ---------- */

const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg",
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg",
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg",
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg",
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg",
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg",
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg",
    },
    // --- Added temples (3+ required) ---
    {
        templeName: "St. George Utah",
        location: "St. George, Utah, United States",
        dedicated: "1877, April, 6",
        area: 107780,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/st-george-utah/400x250/st-george-utah-temple-1500x958.jpg",
    },
    {
        templeName: "Salt Lake",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 253015,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake/400x250/salt-lake-temple-1500x958.jpg",
    },
    {
        templeName: "Rome Italy",
        location: "Rome, Italy",
        dedicated: "2019, March, 10",
        area: 41010,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/400x250/rome-italy-temple-1500x958.jpg",
    },
    {
        templeName: "Cardston Alberta",
        location: "Cardston, Alberta, Canada",
        dedicated: "1923, August, 26",
        area: 63684,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/cardston-alberta/400x250/cardston-alberta-temple-1500x958.jpg",
    },
];

/* ---------- Rendering ---------- */

const grid = document.getElementById("temple-grid");
const resultCount = document.getElementById("result-count");
const navLinks = document.querySelectorAll("nav a");

// Pull the dedication year out of the "YYYY, Month, D" string.
function dedicationYear(dedicated) {
    return parseInt(dedicated.split(",")[0].trim(), 10);
}

// Build one <figure> matching the original markup, plus the
// location/dedicated/area details the assignment requires.
function buildFigure(temple) {
    const figure = document.createElement("figure");

    figure.innerHTML = `
        <img
            src="${temple.imageUrl}"
            alt="${temple.templeName} Temple"
            width="700"
            height="467"
            loading="lazy"
        >
        <figcaption>
            <strong>${temple.templeName}</strong>
            <span>${temple.location}</span>
            <span>Dedicated: ${temple.dedicated}</span>
            <span>${temple.area.toLocaleString("en-US")} sq ft</span>
        </figcaption>
    `;

    return figure;
}

function renderTemples(list) {
    grid.innerHTML = "";

    if (list.length === 0) {
        const empty = document.createElement("p");
        empty.textContent = "No temples match this filter.";
        grid.appendChild(empty);
    } else {
        list.forEach((temple) => grid.appendChild(buildFigure(temple)));
    }

    if (resultCount) {
        resultCount.textContent = `Showing ${list.length} of ${temples.length} temples`;
    }
}

/* ---------- Filtering ---------- */

function applyFilter(filterName) {
    let filtered;

    switch (filterName) {
        case "old":
            filtered = temples.filter((t) => dedicationYear(t.dedicated) < 1900);
            break;
        case "new":
            filtered = temples.filter((t) => dedicationYear(t.dedicated) > 2000);
            break;
        case "large":
            filtered = temples.filter((t) => t.area > 90000);
            break;
        case "small":
            filtered = temples.filter((t) => t.area < 10000);
            break;
        case "home":
        default:
            filtered = temples;
            break;
    }

    renderTemples(filtered);
}

// Wire up each nav link: prevent the "#" jump, mark it active,
// filter the grid, and close the mobile menu after choosing.
navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        navLinks.forEach((l) => l.removeAttribute("aria-current"));
        link.setAttribute("aria-current", "page");

        applyFilter(link.dataset.filter);

        if (nav.classList.contains("open")) {
            nav.classList.remove("open");
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.textContent = "☰";
        }
    });
});

// Initial render: show all temples ("Home").
applyFilter("home");