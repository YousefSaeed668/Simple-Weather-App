let container = document.querySelector(".container");
let searchButton = document.querySelector("button");
let input = document.querySelector("input.search");
let notFound = document.querySelector(".not-found")
let weatherBox = document.querySelector(".weather-box")
let weatherDetails = document.querySelector(".weather-details")
let Apikey = "1d973aff3aaa594d4640d69bfd7da005";
input.onkeyup = (e)=>{
if(e.key==="Enter"){
  searchButton.click();
}
}
searchButton.addEventListener("click", ()=>{
    let inputValue = input.value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&appid=${Apikey}`).then((response)=>{
      return response.json();
    }).then((data)=>{
      if(data.cod==="404"){
        notFound.classList.add("fadeIn")
        notFound.classList.remove("hidden")
        weatherBox.classList.add("hidden")
        weatherDetails.classList.add("hidden")
        container.style.height = '400px';
      } else {
        weatherBox.classList.remove("hidden")
        weatherDetails.classList.remove("hidden")
        weatherBox.classList.add("fadeIn")
        weatherDetails.classList.add("fadeIn")
        notFound.classList.add("hidden")
        notFound.classList.remove("fadeIn")
        container.style.height = "560px";
        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');
        switch (data.weather[0].main) {
          case "Clear":
            image.src="images/clear.png"
            break;
          case "Rain":
            image.src="images/rain.png"
            break;
          case "Snow":
            image.src="images/snow.png"
            break;
          case "Clouds":
            image.src="images/cloud.png"
            break;
          case "Haze":
            image.src="images/mist.png"
            break;
        
          default:
            image.src = '';
        }

        temperature.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>` 
        description.innerHTML = `${data.weather[0].main}` 
        humidity
        humidity.innerHTML = `${data.main.humidity}%`;
        wind.innerHTML = `${parseInt(data.wind.speed)}Km/h`;
      }
    })
})

