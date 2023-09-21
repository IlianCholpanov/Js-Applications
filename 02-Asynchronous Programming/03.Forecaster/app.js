function attachEvents() {
    const getWeatherBtn = document.getElementById('submit');
    const inputValue = document.getElementById('location');
    const forecast = document.getElementById('forecast');
    const symbols = {
        Sunny: "&#x2600",
        "Partly sunny": "&#x26C5",
        Overcast: "&#x2601",
        Rain: "&#x2614",
        Degrees: "&#176",
    };

    getWeatherBtn.addEventListener('click', solve);

    function solve() {
        let url = `http://localhost:3030/jsonstore/forecaster/locations`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                let cityIndex = data.findIndex(el => el.name === inputValue.value);
                if (cityIndex == -1) {
                    throw new Error('Invalid city');
                }
                let cityCode = data[cityIndex].code;

                forecast.style.display = 'block';

                fetch(`http://localhost:3030/jsonstore/forecaster/today/${cityCode}`)
                    .then(res => res.json())
                    .then(data => {
                        const currentForecast = document.querySelector('#current');

                        const conditonalSymbol = document.createElement('span');
                        conditonalSymbol.className = 'condition symbol';
                        conditonalSymbol.innerHTML = symbols[data.forecast.condition];
                        currentForecast.innerHTML = '';
                        currentForecast.appendChild(conditonalSymbol);

                        const conditionList = document.createElement('span');
                        conditionList.className = 'condition';
                        conditionList.innerHTML = `
                            <span class="forecast-data">${data.name}</span>
                            <span class="forecast-data">${data.forecast.low}/${data.forecast.high}</span>
                            <span class="forecast-data">${data.forecast.condition}</span>
                        `;
                        currentForecast.appendChild(conditionList);
                    });

                fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${cityCode}`)
                    .then(res => res.json())
                    .then(data => {
                        const parentEl = document.getElementById('upcoming');
                        parentEl.innerHTML = '';
                        const foreCastInfo = document.createElement('div');
                        foreCastInfo.className = 'forecast-info';

                        data.forecast.forEach(day => {
                            const upcomingElement = document.createElement('span');
                            upcomingElement.className = 'upcoming';
                            upcomingElement.innerHTML = `
                                <span class="symbol">${symbols[day.condition]}</span>
                                <span class="forecast-data">${day.low}/${day.high}</span>
                                <span class="forecast-data">${day.condition}</span>
                            `;
                            foreCastInfo.appendChild(upcomingElement);
                        });

                        parentEl.appendChild(foreCastInfo);
                    })
                    .catch(err => {
                        forecast.style.display = 'block';
                        forecast.textContent = 'Error!';
                    });
            })
            .catch(err => {
                forecast.style.display = 'block';
                forecast.textContent = 'Error!';
            });
    }
}

attachEvents();