const wrapper = document.querySelector(".wrapper"),
inputPart = document.querySelector(".input-part"),
infoPart = inputPart.querySelector(".info-text"),
inputField = inputPart.querySelector(".input");
locationBtn = inputPart.querySelector(".wrapper button"),
humidity = document.querySelector(".humidity span"),
temp = document.querySelector(".weather-part .numb"),
locationData = document.querySelector(".weather-part .country"), 
weatherstate = document.querySelector(".weather-part .weather"),
feellikes = document.querySelector(".weather-part .numb-2"),
arrowBack = document.querySelector("header i"),
humidity = document.querySelector(".weather-part .numhumidity"),
winSpeed = document.querySelector(".weather-part .winSpeed"),
sunrise = document.querySelector(".weather-part .sunrisetime"),
sunset = document.querySelector(".weather-part .sunsettime"),

weathericon = document.querySelector(".weather-icon");

let api ;

const APP_ip = '398a57949614c9039fcda619d0f51b66'
inputField.addEventListener("keyup", e =>{
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);
    }
});


locationBtn.addEventListener("click", () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
    else{ 
        alert('your browser does not support geolocation')
    }
});

function requestApi(city) {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APP_ip}&units=metric`;
    fetchData();
}
function onSuccess(position){
    
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&}&appid=${APP_ip}&units=metric`
    fetchData();
} ;
function onError(error){ 
    infoPart.innerHTML = error.message;
    infoPart.classList.add("error");

}
function fetchData(){
    infoPart.innerText = "Getting weather details...";
    infoPart.classList.add("pending");
    fetch(api).then(res => res.json()).then(result => weatherDetails(result));
}


function weatherDetails(info){
    
    if(info.cod=="404"){
        infoPart.classList.replace("pending" , "error");
        infoPart.innerHTML = `${inputField.value} is not city name`;
        inputField.value = "";
        
        
    }else {

        weathericon.setAttribute('src', `http://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`)
        temp.innerHTML = Math.floor(info.main.temp);
        weatherstate.innerHTML = `${info.weather[0].main},${info.weather[0].description}`;
        locationData.innerText = `${info.name}, ${info.sys.country}`;
        feellikes.innerHTML = Math.floor(info.main.feels_like);
        humidity.innerHTML = `${info.main.humidity}%`;
        sunrise.innerHTML = `${moment.unix(info.sys.sunrise).format('h:mm')} Am` ;
        sunset.innerHTML = `${moment.unix(info.sys.sunset).format('h:mm')} PM` ;
        winSpeed.innerHTML = `${(info.wind.speed * 3,6).toFixed(2)}km/h`;

        infoPart.classList.remove("pending" , "error");
        infoPart.innerHTML = "";
        inputField.value = "";
        wrapper.classList.add("active");
    }
}


arrowBack.addEventListener("click", () => {
    wrapper.classList.remove("active");
    infoPart.innerText = "";
})