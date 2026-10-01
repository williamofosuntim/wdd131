// ===== Royal Pearl International School - Site Script =====

document.addEventListener('DOMContentLoaded', function () {

    // 1. Auto-update the footer copyright year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. "Read More" toggle for the welcome paragraph (index page only)
    const readMoreBtn = document.getElementById('read-more-btn');
    const extraText = document.getElementById('extra-text');

    if (readMoreBtn && extraText) {
        readMoreBtn.addEventListener('click', function () {
            const isHidden = extraText.classList.toggle('hidden');
            readMoreBtn.textContent = isHidden ? 'Read More' : 'Read Less';
            readMoreBtn.setAttribute('aria-expanded', String(!isHidden));
        });
    }

    // 3. Contact form handling
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        // An object mapping each inquiry reason to a personalized response
        const inquiryResponses = {
            admissions: 'Our admissions team will reach out to you soon.',
            general: 'Thank you for reaching out. We will respond shortly.'
        };

        const confirmationBox = document.getElementById('formConfirmation');

        // Shows a message in the confirmation box (unhide first so screen readers announce it)
        function showMessage(text) {
            confirmationBox.classList.remove('hidden');
            confirmationBox.textContent = text;
        }

        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const nameInput = document.getElementById('fullName');
            const emailInput = document.getElementById('email');
            const reasonSelect = document.getElementById('reason');

            // A real array of the required fields, checked with an array method
            // (catches values that are only spaces, which the browser's "required" allows)
            const requiredFields = [nameInput, emailInput, reasonSelect];
            const emptyFields = requiredFields.filter(function (field) {
                return field.value.trim() === '';
            });

            if (emptyFields.length > 0) {
                showMessage('Please fill in all required fields before submitting.');
                emptyFields[0].focus();
                return;
            }

            const name = nameInput.value.trim();
            const reason = reasonSelect.value;
            const responseMessage = inquiryResponses[reason] || inquiryResponses.general;

            // localStorage keeps a running count of inquiries from this browser
            // (wrapped in try/catch because storage can be blocked by browser settings)
            let inquiryCount = 1;
            try {
                const saved = parseInt(localStorage.getItem('inquiryCount'), 10);
                inquiryCount = Number.isNaN(saved) ? 1 : saved + 1;
                localStorage.setItem('inquiryCount', inquiryCount);
            } catch (error) {
                inquiryCount = 1;
            }

            // Template literal builds the confirmation message
            showMessage(`Thank you, ${name}! ${responseMessage} This is inquiry #${inquiryCount} submitted from this browser.`);

            contactForm.reset();
        });
    }

});