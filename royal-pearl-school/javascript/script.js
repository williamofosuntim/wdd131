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

});