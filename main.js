

let clock = document.getElementById('clock');
let calculator = document.getElementById('calculator');
let weather = document.getElementById('weather');
let notes = document.getElementById('notes');

function addBorder(tab){
    if (tab === clock){
        calculator.style.border = '';
        notes.style.border = '';
        weather.style.border = '';
        clock.style.border = '2px solid cyan'
    } else if (tab === calculator){
        calculator.style.border = '2px solid cyan';
        notes.style.border = '';
        weather.style.border = '';
        clock.style.border = '';
        } else if (tab === weather){
            calculator.style.border = '';
            notes.style.border = '';
            weather.style.border = '2px solid cyan';
            clock.style.border = ''
            } else if (tab === notes){
                calculator.style.border = '';
                notes.style.border = '2px solid cyan';
                weather.style.border = '';
                clock.style.border = ''
            }
}

clock.addEventListener('click', ()=> {
    addBorder(clock);
})

calculator.addEventListener('click', ()=> {
    addBorder(calculator);
})

weather.addEventListener('click', ()=> {
    addBorder(weather);
})

notes.addEventListener('click', ()=> {
    addBorder(notes);
})


// ******************* notes section below ************************
let notesAddNote = document.getElementById('notesAddNote');
let notesTextBox = document.getElementById('notesTextBox');
let notesPostNoteButton = document.getElementById('notesPostNoteButton');
let notesViewNotesButton = document.getElementById('notesViewNotesButton');
let notesNotesList = document.getElementById('notesNotesList');
let notesClearNotesButton = document.getElementById('notesClearNotesButton');

// Assigns the local storage key to be first 3 words of the note 
const notesNotePreviewFunc = () => {
    return notesTextBox.value.split(' ').slice(0, 3).join(' ');
}

// adds note to notesNotesList from botom button
notesPostNoteButton.addEventListener('click', ()=> {
    if (notesTextBox.value !== ''){
        localStorage.setItem(notesNotePreviewFunc(), notesTextBox.value);
    }
    return;
});

// hit the plus sign at the top to generate a fresh note
notesAddNote.addEventListener('click', ()=> {
    if (notesNotesList.style.display === 'block'){
        notesClearNotesButton.style.display = 'none';
        notesNotesList.style.display = 'none';
        notesTextBox.style.display = 'block';
    }
    if (notesTextBox.value == ''){
        return;
    } else {
        localStorage.setItem(notesNotePreviewFunc(), notesTextBox.value);
    }
    notesTextBox.value = '';
})

// function adds notes to notesNotesList div 
const notesViewNotesFunc = () => {
    let a = Object.values(localStorage);
    return a.map(e=> e + '</br></br>').join(' ');
}

//shows you list of saved notes
notesViewNotesButton.addEventListener('click', ()=> {
    notesClearNotesButton.style.display = 'inline';
    if (notesTextBox.style.display !== 'none'){
        notesTextBox.style.display = 'none';
        notesNotesList.style.display = 'block'; 
        notesNotesList.innerHTML = notesViewNotesFunc();
    } else {
        notesTextBox.style.display = 'block';
        notesTextBox.value = '';
        notesClearNotesButton.style.display = 'none';
        notesNotesList.style.display = 'none'; 
    }
});

// will clear out all saved notes 
notesClearNotesButton.addEventListener('click', ()=> {
    let deleteAllNotes = confirm('this will delete all notes');
    if (deleteAllNotes){
        localStorage.clear();
        notesNotesList.style.display = 'none';
        notesTextBox.style.display = 'block';
        notesTextBox.value = '';
        notesClearNotesButton.style.display = 'none';
    }
})






// ****************** weather section below ************************
import cities from './cityList.js'; 

let weatherRefreshButton = document.getElementById('weatherRefreshButton');
let weatherCurrentCity = document.getElementById('weatherCurrentCity');
let weatherGoButton = document.getElementById('weatherGoButton');
let weatherCurrentTemp = document.getElementById('weatherCurrentTemp');
let weatherCurrentIcon = document.getElementById('weatherCurrentIcon');
let weatherCurrentDescription = document.getElementById('weatherCurrentDescription');
let weatherPrecip = document.getElementById('weatherPrecip');
let weatherFeelsLike = document.getElementById('weatherFeelsLike');
let weatherWind = document.getElementById('weatherWind');
let weatherHumididty = document.getElementById('weatherHumidity');
let weatherHourOne = document.getElementById('weatherHourOne');
let weatherTextBox = document.getElementById('weatherTextBox');

// uses the openweathermap 1call api with coordinates. defaults to austin coords
const weatherGetCurrentsFunc = (lat = 30.382580, lon = -97.710243) => {
fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=89487f45423ccbfbdd6e1ea526f5177f`)
    .then(response=> response.json())
    .then(data=> {
        let temp = data.current.temp;
        let icon = data.current.weather[0]['icon'];
        let description = data.current.weather[0]['description'];
        let feelsLike = data.current.feels_like;
        let wind = data.current.wind_speed;
        let humidity = data.current.humidity;
        let precipitation = data.minutely[0]['precipitation'];

        weatherCurrentTemp.innerHTML = `${Math.round(temp)}\u00b0`;
        weatherCurrentIcon.innerHTML =  `<img src="http://openweathermap.org/img/wn/${icon}@2x.png">`
        weatherCurrentDescription.innerHTML = description;
        
        const darkText = () => {
            weather.style.color = "#444444";
            weatherRefreshButton.style.color = "#444444";
            weatherTextBox.style.color = "#444444";
            weatherGoButton.style.color = "#444444";
        }

        const lightText = () => {
            weather.style.color = "whitesmoke";
            weatherRefreshButton.style.color = "whitesmoke";
            weatherTextBox.style.color = "whitesmoke";
            weatherGoButton.style.color = "whitesmoke";
        }

        // injects pictures and font color based on conditions
        if (description.includes('clear')){
            weather.style.backgroundImage = "url('pics/clearsky_hud.jpg')";
            darkText();
        } else if (description.includes('cloud')){
            weather.style.backgroundImage= "url('pics/clouds_hud.jpg')";
            lightText();
        } else if (description.includes('rain') || description.includes('drizzle')){
            weather.style.backgroundImage = "url('pics/rain_hud.jpg')";
            lightText();
        } else if (description.includes('storm')){
            weather.style.backgroundImage = "url('pics/storm_hud.jpg')";
            lightText();
        } else if (description.includes('snow')){
            weather.style.backgroundImage = "url('pics/snow_hud.jpg')";
            lightText();
        } else if (description.includes('mist')){
            weather.style.backgroundImage = "url('pics/mist_hud.jpg')";
            lightText();
        } else if (description.includes('fog')){
            weather.style.backgroundImage = "url('pics/fog_hud.jpeg')";
            darkText();
        }
        
        weatherFeelsLike.innerHTML = `feels like ${Math.round(feelsLike)}\u00b0`;
        weatherPrecip.innerHTML = `precipitation ${precipitation}%`;
        weatherWind.innerHTML = `wind ${Math.round(wind)}mph`;
        weatherHumididty.innerHTML = `humidity ${humidity}%`;

        // below deals with assigning am/pm and hourly data
        let timestamp = data.hourly[0]['dt'];
        let date = new Date(timestamp * 1000);
        let pm = false;
        let currentHour = date.getHours();
        
        if (currentHour > 12){
            currentHour -= 12;
            pm = true;
        }
       
        // handles hourly time stretching into next day
        if (pm === true && currentHour === 9){
            weatherHourOne.innerHTML = `${currentHour + 1}pm`;
            weatherHourTwo.innerHTML = `${currentHour + 2}pm`;
            weatherHourThree.innerHTML = `${currentHour + 3}am`;
        } else if (pm === true && currentHour === 10){
            weatherHourOne.innerHTML = `${currentHour + 1}pm`;
            weatherHourTwo.innerHTML = `${currentHour + 2}am`;
            weatherHourThree.innerHTML = `${currentHour - 9}am`;
        } else if (pm === true && currentHour === 11){
            weatherHourOne.innerHTML = `${currentHour + 1}am`;
            weatherHourTwo.innerHTML = `${currentHour - 10}am`;
            weatherHourThree.innerHTML = `${currentHour - 9}am`;
        } else { 
            weatherHourOne.innerHTML = pm === true ? `${currentHour + 1}pm` : `${currentHour + 1}am`;
            weatherHourTwo.innerHTML = pm === true ? `${currentHour + 2}pm` : `${currentHour + 2}am`;
            weatherHourThree.innerHTML = pm === true ? `${currentHour + 3}pm` : `${currentHour + 3}am`;
        }

        let hour1Icon = data.hourly[0].weather[0]['icon'];
        weatherIconOne.innerHTML = `<img src="http://openweathermap.org/img/wn/${hour1Icon}.png">`; 

        let hour2Icon = data.hourly[1].weather[0]['icon'];
        weatherIconTwo.innerHTML =  `<img src="http://openweathermap.org/img/wn/${hour2Icon}.png">`; 
        
        let hour3Icon =  data.hourly[2].weather[0]['icon'];
        weatherIconThree.innerHTML = `<img src="http://openweathermap.org/img/wn/${hour3Icon}.png">`; 

        let hour1Temp = Math.round(data.hourly[0]['temp']);
        weatherTempOne.innerHTML = `${hour1Temp}\u00b0`;

        let hour2Temp = Math.round(data.hourly[1]['temp']);
        weatherTempTwo.innerHTML = `${hour2Temp}\u00b0`;
       
        let hour3Temp = Math.round(data.hourly[2]['temp']);
        weatherTempThree.innerHTML = `${hour3Temp}\u00b0`;
    })
    .catch(errror=> {
        alert('could not load weather data');
        console.error('the 1call api to via openweathermap failed. check coords or api key');
    })
}

// takes weatherTextBox input and spits out the city 'id' to find a match within citiyList
const nameMatchFunc = (userInput) => {
    let cityList = (Object.values(cities)[0]).filter(e=> e['state'] !== '');
    let cityString = '';
    let id; 
    let cityMatches = [];

    if (userInput.split(' ').length === 1){
        cityString = userInput.split('').map((e,i,a)=> i === 0 ? e.toUpperCase() : e).join('');
    } else {
        cityString = userInput.split('').map((e,i,a)=> i === 0 ? e.toUpperCase() : 
            a[i-1] === ' ' ? e.toUpperCase() : e).join('');
    }
    for (let i=0;i<cityList.length;i++){
            if (cityString === cityList[i]['name'] && cityList[i]['state'] !== ''){
                cityMatches.push(cityList[i]['id']);
            }
    }

    // Uses first match found in cityList. Can give problems with duplicate city names
    id = cityMatches[0];
    // assigns the the userInput to the current city div 
    weatherCurrentCity.innerHTML = cityString;
    return id;
}

// ****** comments below for getCitySearchCurrentsFunc ********
// used for searches or refreshing after a search
// plugs in either the weatherTextBox input or uses current city
// calls nameMatchFunc to get the city id then uses that to get the city's coords to run the weatherGetCurrentsFunc
const getCitySearchCurrentsFunc = () => {
    let status = weatherTextBox.value;
    if (status === ''){
        status = weatherCurrentCity.innerHTML;
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?id=${nameMatchFunc(status)}&units=imperial&appid=89487f45423ccbfbdd6e1ea526f5177f`)
        .then(response=> response.json())
        .then(data=> {
            let lat = data.coord['lat'];
            let lon = data.coord['lon'];
            weatherGetCurrentsFunc(lat, lon);
            weatherTextBox.value = '';
        })
        .catch(error=> {
            console.error(`no match for "${weatherTextBox.value}." could not find the city id for gitCitySearchCurrentsFunc`);
            alert(`could not get weather for "${weatherTextBox.value}"`)
            weatherTextBox.value = '';
        })
}

// when refreshed manually
weatherRefreshButton.addEventListener('click', ()=> {
    getCitySearchCurrentsFunc();
})

weatherGoButton.addEventListener('click', ()=> {
    getCitySearchCurrentsFunc();
});

weatherTextBox.addEventListener('keydown', (e)=> {
    if (e.keyCode === 13){
        getCitySearchCurrentsFunc();
    }
});

// refreshes current temps every minute
window.setInterval(()=> {
    getCitySearchCurrentsFunc();
}, 60000)

// runs on page load to get austin weather
weatherGetCurrentsFunc();




// ****************** clock section below *********************
let clockDigit1 = document.getElementById('clockDigit1');
let clockDigit2 = document.getElementById('clockDigit2');
let clockDigit3 = document.getElementById('clockDigit3');
let clockDigit4 = document.getElementById('clockDigit4');
let clockDigitSeconds1 = document.getElementById('clockDigitSecs1');
let clockDigitSeconds2 = document.getElementById('clockDigitSecs2');

window.setInterval(()=>{
    let date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    let pm = false;

    if (hour > 12){
        hour -= 12;
        pm = true;
    }
    
    let hourArr = ('' + hour).split('');
    let minArr = ('' + min).split('');
    let secArr = ('' + sec).split('');

    if (hourArr.length === 1){
        clockDigit1.innerHTML = '';
        clockDigit2.innerHTML = hourArr[0];
    } else {
        clockDigit1.innerHTML = hourArr[0];
        clockDigit2.innerHTML = hourArr[1];
    }

    if (minArr.length === 1){
        clockDigit3.innerHTML = '0'; 
        clockDigit4.innerHTML = minArr[0];
    } else {
        clockDigit3.innerHTML = minArr[0];
        clockDigit4.innerHTML = minArr[1];
    }

    if (secArr.length === 1){
        clockDigitSecs1.innerHTML = '0';
        clockDigitSecs2.innerHTML = secArr[0];
    } else {
        clockDigitSecs1.innerHTML = secArr[0];
        clockDigitSecs2.innerHTML = secArr[1];
    }

    if (pm === true){
        clockAP.innerHTML = 'P';
    } else {
        clockAP.innerHTML = 'A';
    }

    clockM.innerHTML = 'M';
    //console.log(date.getHours(), date.getMinutes(), date.getSeconds());
}, 1000);



let alarm = new Audio('sounds/alarm.mp3');

const clockAlarmFunc = () => alarm.play();



