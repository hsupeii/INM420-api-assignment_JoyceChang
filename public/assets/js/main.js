async function getData() {
    // console.log("123");
    try{
        const response = await fetch("https://api.weatherapi.com/v1/forecast.json?key=c746295adf97406091e183645250802&q=toronto&days=7&aqi=yes&alerts=no");
        const data = await response.json();

        console.log(data);
        console.log(data.date);

        // put h1 in a variable
        const title = document.querySelector('#td-title');
        //display api title in h1
        title.innerHTML = data.location.name;

        // turns to weekdays
        const currentDate = new Date(data.location.localtime);
        const weekday = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
        
        const time = document.querySelector('#td-time');
        time.innerHTML = `${weekday}, ${data.location.localtime}`;

        //put temperature h2 in a variable
        const temp = document.querySelector('#td-temp');
        temp.innerHTML = `${data.current.temp_c}°`;

        //put feels like temp p in a variable
        const tempF = document.querySelector('#td-temp-f');
        tempF.innerHTML = `Feels like: ${data.current.feelslike_c}°`;

        //put Highest lowest temp p in a variable
        const tempHL = document.querySelector('#td-temp-hl');
        tempHL.innerHTML = `H: ${data.forecast.forecastday[0].day.maxtemp_c}° L: ${data.forecast.forecastday[0].day.mintemp_c}°`;


        //put info p in a variable
        const info = document.querySelector('#td-info');
        //display image and explanation in p
        info.innerHTML = `
        <img src=" ${data.current.condition.icon}" alt="${data.current.condition.text}" /> 
        <h3>${data.current.condition.text}</h3>
        `;

        //next 7 days 
        const next7days = document.querySelector('#next-7-days');
        const forecastHTML = data.forecast.forecastday
            .slice(1) // start from tomorrow
            .map(day => {
                // turns to weekdays
                const date = new Date(day.date);
                const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
                
                return `
                    <li class="forecast-day">
                        <h3>${weekday}</h3>
                        <img src="${day.day.condition.icon}" alt="${day.day.condition.text}" />
                        <p class="temp-range">
                            <span class="high">${Math.round(day.day.maxtemp_c)}°</span>
                            <span class="low">${Math.round(day.day.mintemp_c)}°</span>
                        </p>
                    </li>
                `;
            }).join('');

        next7days.innerHTML = forecastHTML;


        //wind
        const wind = document.querySelector('#td-wind');
        wind.innerHTML = `<p> Wind </p> <span>${data.current.wind_mph} km/h </span>`;

        //humidity
        const humidity= document.querySelector('#td-humidity');
        humidity.innerHTML = `<p> Humidity </p> <span>${data.current.humidity}</span>`;

        //air quality
        const air= document.querySelector('#td-air');
        air.innerHTML = `<p> PM 2.5 </p> <span>${data.current.air_quality.pm2_5}</span>`;

        //UV
        const uv= document.querySelector('#td-uv');
        uv.innerHTML = `<p> UV </p> <span>${data.current.uv}</span>`;

        
        
    }catch(error){
        console.log("Error: " , eror);
    }
}
getData();