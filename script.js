    // Use const for variables that won't be reassigned
    const apiKey = "426ff7ffa07feb586d38bd6568168d24";
    const inputValue = document.querySelector('#cityinput');
    const btn = document.querySelector('#add');
    const city = document.querySelector('.cityoutput');
    const description = document.querySelector('#description');
    const temp = document.querySelector('#temp');
    const wind = document.querySelector('#wind');

    // Move the function outside of the event listener
    function convertCelsius(value) {
      return (value - 273.15).toFixed(2);
    }

    // Add event listener to the button
    btn.addEventListener('click', () => {
      // Use template literals for string concatenation
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue.value}&appid=${apiKey}`;

      fetch(url)
        .then(response => {
          // Check if the response is OK
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          // Use template literals for string concatenation
          const nameVal = data.name;
          const descrip = data.weather[0].description;
          const tempVal = convertCelsius(data.main.temp);
          const windSpeed = data.wind.speed;

          city.innerHTML = `Weather of <span>${nameVal}</span>`;
          temp.innerHTML = `Temperature: <span>${tempVal}°C</span>`;
          description.innerHTML = `Sky Conditions: <span>${descrip}</span>`;
          wind.innerHTML = `Wind Speed: <span>${windSpeed} m/s</span>`;
        })
        .catch(error => {
          // Log the error to the console
          console.error('Error:', error);
          alert("You entered a wrong city name, please try again.");
        });
    });