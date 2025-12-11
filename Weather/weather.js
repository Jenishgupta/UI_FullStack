var API_KEY = "Api_Key";

function LoadWeatherData() {
    var cityName = document.getElementById("txtCity").value.trim();

    // If input is empty
    if (cityName.length === 0) {
        showError("Please enter a city name.");
        return;
    }

    // Show loading spinner and hide other elements
    showLoading(true);
    hideError();
    document.getElementById("detailsCard").style.display = "none";

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`)
        .then(response => response.json())
        .then(data => {
            showLoading(false);

            // If city not found / API error
            if (data.cod !== 200) {
                showError("City not found! Please enter a valid city name.");
                return;
            }

            // Update UI with weather data
            document.getElementById("lblCity").textContent = data.name;
            document.getElementById("lblTemp").innerHTML = `${Math.round(data.main.temp)}&deg;C`;
            document.getElementById("lblDescription").textContent = capitalizeFirstLetter(data.weather[0].description);
            document.getElementById("lblHumidity").textContent = data.main.humidity;
            document.getElementById("lblWindSpeed").textContent = data.wind.speed;
            document.getElementById("lblPressure").textContent = data.main.pressure;
            document.getElementById("lblFeelsLike").textContent = Math.round(data.main.feels_like);

            // Set weather icon based on condition
            setWeatherIcon(data.weather[0].main);

            // Show card after successful load
            document.getElementById("detailsCard").style.display = "block";
        })
        .catch(error => {
            showLoading(false);
            showError("Unable to fetch weather data. Please check your internet connection and try again.");
            console.error(error);
        });
}

function SearchClick() {
    LoadWeatherData();
}

function showLoading(show) {
    document.getElementById("loadingSpinner").style.display = show ? "flex" : "none";
}

function showError(message) {
    document.getElementById("errorText").textContent = message;
    document.getElementById("errorMessage").style.display = "block";
}

function hideError() {
    document.getElementById("errorMessage").style.display = "none";
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function setWeatherIcon(weatherMain) {
    const iconElement = document.getElementById("weatherIcon");
    let iconClass = "bi bi-cloud-sun-fill"; // default

    switch (weatherMain.toLowerCase()) {
        case "clear":
            iconClass = "bi bi-sun-fill";
            break;
        case "clouds":
            iconClass = "bi bi-cloud-fill";
            break;
        case "rain":
            iconClass = "bi bi-cloud-rain-fill";
            break;
        case "drizzle":
            iconClass = "bi bi-cloud-drizzle-fill";
            break;
        case "thunderstorm":
            iconClass = "bi bi-cloud-lightning-fill";
            break;
        case "snow":
            iconClass = "bi bi-cloud-snow-fill";
            break;
        case "mist":
        case "fog":
            iconClass = "bi bi-cloud-fog-fill";
            break;
    }

    iconElement.className = iconClass + " weather-icon";
}

// Allow search on Enter key press
document.getElementById("txtCity").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        SearchClick();
    }
});
