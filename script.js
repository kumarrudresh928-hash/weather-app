const apiKey = "ac363320285e590666640889db1e70d9";

function getWeather() {
    const city = document.getElementById("city").value;

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.cod === "404") {
                document.getElementById("result").innerHTML = "City not found";
                return;
            }

            const temp = data.main.temp;
            const weather = data.weather[0].description;

            document.getElementById("result").innerHTML = `
                <p><strong>${data.name}</strong></p>
                <p>Temperature: ${temp} °C</p>
                <p>Condition: ${weather}</p>
            `;
        })
        .catch(error => {
            console.log(error);
            document.getElementById("result").innerHTML = `Error fetching data: ${error.message}`;
        });
}
