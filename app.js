const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = data => {

    const cityDetails = data.cityDetails;
    const weather = data.weather;

    //update details template
    details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
         <div class="display-4 my-4">
            <span>${weather.Temperature.Imperial.Value}</span>
            <span>&deg;F</span>
        </div>
            `;
    //remove display none from card
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    };

    //update day/night image


    let timeSrc = null;
    if (weather.IsDayTime) {
        timeSrc = 'img/day.svg';
    } else {
        timeSrc = 'img/night.svg';
    }
    time.setAttribute('src', timeSrc);

    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);
};

const updateCity = async city => {

    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);

    return {
        cityDetails: cityDetails,
        weather: weather
    };
};

cityForm.addEventListener('submit', e => {
    // prevent default action
    e.preventDefault();

    // get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update the ui with new city
    updateCity(city).then(data => updateUI(data)).catch(err => console.log(err));

    // set local storage
    localStorage.setItem('city', city);
});

if (localStorage.getItem('city')) {
    updateCity(localStorage.getItem('city')).then(data => updateUI(data)).catch(err => console.log(err));
};
