// ===== Royal Pearl International School - Site Script =====

document.addEventListener('DOMContentLoaded', function () {

    // 1. Auto-update the footer copyright year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Highlight the active page in the navigation
    const navLinks = document.querySelectorAll('nav a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(function (link) {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active-link');
        }
    });

    // 3. "Read More" toggle for the welcome paragraph (index page only)
    const readMoreBtn = document.getElementById('read-more-btn');
    const extraText = document.getElementById('extra-text');

    if (readMoreBtn && extraText) {
        readMoreBtn.addEventListener('click', function () {
            const isHidden = extraText.classList.toggle('hidden');
            readMoreBtn.textContent = isHidden ? 'Read More' : 'Read Less';
        });
    }

    // 4. Contact form handling
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        // An object mapping each inquiry reason to a personalized response
        const inquiryResponses = {
            admissions: 'Our admissions team will reach out within 2 business days.',
            tour: 'We will contact you soon to schedule your campus visit.',
            general: 'Thank you for reaching out. We will respond shortly.'
        };

        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const nameInput = document.getElementById('fullName');
            const emailInput = document.getElementById('email');
            const reasonSelect = document.getElementById('reason');
            const confirmationBox = document.getElementById('formConfirmation');

            // A real array of the required fields, checked with an array method
            const requiredFields = [nameInput, emailInput, reasonSelect];
            const emptyFields = requiredFields.filter(function (field) {
                return field.value.trim() === '';
            });

            if (emptyFields.length > 0) {
                confirmationBox.textContent = 'Please fill in all required fields before submitting.';
                confirmationBox.classList.remove('hidden');
                return;
            }

            const name = nameInput.value.trim();
            const reason = reasonSelect.value;
            const responseMessage = inquiryResponses[reason];

            // localStorage keeps a running count of inquiries from this browser
            let inquiryCount = localStorage.getItem('inquiryCount');
            inquiryCount = inquiryCount ? parseInt(inquiryCount, 10) + 1 : 1;
            localStorage.setItem('inquiryCount', inquiryCount);

            // Template literal builds the confirmation message
            confirmationBox.textContent = `Thank you, ${name}! ${responseMessage} This is inquiry #${inquiryCount} submitted from this browser.`;
            confirmationBox.classList.remove('hidden');

            contactForm.reset();
        });
    }

});