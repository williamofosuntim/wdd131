document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modification: ${document.lastModified}`;

const temperature = 10; // °C
const windSpeed = 12; // km/h

function calculateWindChill(temp, wind) {
    return 13.12 + 0.6215 * temp - 11.37 * Math.pow(wind, 0.16) + 0.3965 * temp * Math.pow(wind, 0.16);
}

let windChillDisplay = "N/A";
if (temperature <= 10 && windSpeed > 4.8) {
    windChillDisplay = `${calculateWindChill(temperature, windSpeed).toFixed(1)} °C`;
}

document.getElementById("windChill").textContent = windChillDisplay;