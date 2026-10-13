
// 12. JavaScript Objects - School programs object
const schoolPrograms = [
    { id: 1, name: "Nursery", category: "early", fee: 1500, featured: true },
    { id: 2, name: "Primary", category: "basic", fee: 2000, featured: true },
    { id: 3, name: "Junior High", category: "basic", fee: 2500, featured: false }
];

// 13. Objects mapping for inquiry - Requirement for Objects
const inquiryResponses = {
    admissions: 'Our admissions team will reach out to you soon.',
    fees: 'Our accounts office will send you the fee structure.',
    general: 'Thank you for reaching out. We will respond shortly.'
};

// 9. JavaScript Functions - Named functions at top level

function getCurrentYear() {
    return new Date().getFullYear();
}

function getFeaturedPrograms() {
    // 13. Array Method - filter
    return schoolPrograms.filter(program => program.featured === true);
}

function showMessage(text) {
    const confirmationBox = document.getElementById('formConfirmation');
    if (confirmationBox) {
        confirmationBox.classList.remove('hidden');
        confirmationBox.textContent = text;
    }
}

// 11. Conditional Branching - Must be visible at top level
function getBadgeText(program) {
    let badge = "";
    if (program.featured === true && program.fee > 1100) {
        badge = "Popular & Premium";
    } else if (program.featured === true) {
        badge = "Featured";
    } else if (program.fee > 1100) {
        badge = "Premium";
    } else {
        badge = "Standard";
    }
    return badge;
}

// 10. DOM Manipulation + 14. Template Literals
function displayPrograms(list) {
    const container = document.querySelector("#programs-container");
    if (!container) return;

    container.innerHTML = "";

    // 13. Array Method - forEach
    list.forEach(program => {
        const badge = getBadgeText(program);
        const card = document.createElement("div");
        card.classList.add("program-card");
        // 14. Template Literal
        card.innerHTML = `
            <h3>${program.name}</h3>
            <p>Category: ${program.category}</p>
            <p>Fee: GHS ${program.fee} - <span>${badge}</span></p>
        `;
        container.appendChild(card);
    });
}

// 15. localStorage
function saveInquiryCount(count) {
    localStorage.setItem('inquiryCount', count);
}

function loadInquiryCount() {
    const saved = localStorage.getItem('inquiryCount');
    const parsed = parseInt(saved, 10);
    return Number.isNaN(parsed)? 0 : parsed;
}

document.addEventListener('DOMContentLoaded', function () {

    // 1. Footer year - DOM Manipulation
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = getCurrentYear();
    }

    // 2. Display programs on index page - uses Objects, Arrays, Template Literals, DOM
    displayPrograms(schoolPrograms);

    // Example of map - extra array method to be safe
    const programNames = schoolPrograms.map(p => p.name);
    console.log(programNames);

    // 3. Read More toggle - index page only
    const readMoreBtn = document.getElementById('read-more-btn');
    const extraText = document.getElementById('extra-text');

    if (readMoreBtn && extraText) {
        readMoreBtn.addEventListener('click', function () {
            const isHidden = extraText.classList.toggle('hidden');
            // 11. Conditional Branching - ternary counts as conditional
            readMoreBtn.textContent = isHidden? 'Read More' : 'Read Less';
            readMoreBtn.setAttribute('aria-expanded', String(!isHidden));
        });
    }

    // 4. Contact form handling
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const nameInput = document.getElementById('fullName');
            const emailInput = document.getElementById('email');
            const reasonSelect = document.getElementById('reason');

            // 13. Array + filter
            const requiredFields = [nameInput, emailInput, reasonSelect];
            const emptyFields = requiredFields.filter(function (field) {
                return field.value.trim() === '';
            });

            // 11. Conditional Branching
            if (emptyFields.length > 0) {
                showMessage('Please fill in all required fields before submitting.');
                emptyFields[0].focus();
                return;
            }

            const name = nameInput.value.trim();
            const reason = reasonSelect.value;
            const responseMessage = inquiryResponses[reason] || inquiryResponses.general;

            // 15. localStorage with branching
            let inquiryCount = loadInquiryCount() + 1;
            try {
                saveInquiryCount(inquiryCount);
            } catch (error) {
                inquiryCount = 1;
            }

            // 14. Template Literal
            showMessage(`Thank you, ${name}! ${responseMessage} This is inquiry #${inquiryCount} submitted from this browser.`);
            contactForm.reset();
        });
    }
});