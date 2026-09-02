const currentYearElement = document.getElementById('currentyear');
currentYearElement.textContent = new Date().getFullYear();

const lastModifiedElement = document.getElementById('lastModified');
lastModifiedElement.textContent = `Last Modification: ${document.lastModified}`;