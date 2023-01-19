const $ = document
const searchInput = $.querySelector(".search-box")
const mainContainer = $.querySelector("main")
let cityElem = $.querySelector(".city")
let dateElem = $.querySelector(".date")
let tempElem = $.querySelector(".temp")
let weatherElem = $.querySelector(".weather")
let hi_LowElem = $.querySelector(".hi-low")
let humidityElem=$.querySelector(".humidity")
let pressureElem=$.querySelector(".pressure")

const fetchURL = "https://api.openweathermap.org/data/2.5/weather?q="
let cityName = null
const apiKey = "8d1ea57f5c7bb682b127c50f23b95b2b"

searchInput.addEventListener("keyup", event =>{
	let {keyCode, target:input} = event
	if(keyCode === 13){
		cityName = input.value
		weatherData(cityName)
	}
})

function weatherData(CityName) {
	fetch(`${fetchURL}${CityName}&appid=${apiKey}`)
		.then(res => res.json())
		.then(cityData => {
			console.log(cityData)
			cityElem.innerHTML = `${cityData.name}, ${cityData.sys.country}`
			dateElem.innerHTML = mainDate()
			tempElem.innerHTML = `${Math.floor(cityData.main.temp - 273.15)}<span>°c</span>`
			weatherElem.innerHTML = `${cityData.weather[0].main}`
			hi_LowElem.innerHTML = `${Math.floor(cityData.main.temp_min - 273.15)}°c / ${Math.floor(cityData.main.temp_max - 273.15)}°c`
            humidityElem.innerHTML=`${cityData.main.humidity}%`
            pressureElem.innerHTML=`${cityData.main.pressure}hPa`
        })
		.catch(err => alert("city not found"))
}

function mainDate() {
	let weekArray = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
	let monthArray = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"]
	let localDate = new Date()
	let day = localDate.getDate()
	let week =  weekArray[localDate.getDay()]
	let month = monthArray[localDate.getMonth()]
	let year = localDate.getFullYear()
	return `${week} ${day} ${month} ${year}`
}