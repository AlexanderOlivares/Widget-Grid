

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

let weatherError = false;
const weatherDisplay404 = () => {
        weatherEnterCity.style.display = 'none';
        document.getElementById('weather404Icon').style.display = 'block';
        document.getElementById('weather404Text').style.display = 'block';
}


// uses the openweathermap 1call api with coordinates. defaults to austin coords
const weatherGetCurrentsFunc = (lat = 30.382580, lon = -97.710243) => {
fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=89487f45423ccbfbdd6e1ea526f5177f`)
    .then(response=> response.json())
    .then(data=> {
        //console.log(data);
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
      
        // in case of long description text wont wrap to second line 
        if (description.split(' ').length > 4){
            weatherCurrentDescription.style.fontSize = '18px';
        }

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
        //weatherPrecip.innerHTML = `precipitation ${Math.round(precipitation)}%`;
        weatherWind.innerHTML = `wind ${Math.round(wind)}mph`;
        weatherHumididty.innerHTML = `humidity ${humidity}%`;

        // below deals with assigning am/pm and hourly data
        let timestamp = data.hourly[0]['dt'];
        let date = new Date(timestamp * 1000);
        let pm = false;
        let currentHour = date.getHours();
        
        if (currentHour === 12){
            pm = true;
        }
        if (currentHour > 12){
            currentHour -= 12;
            pm = true;
        }
       
        // handles hourly time stretching from pm -> am   
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
        }
        // handles hourly time stretching from am -> pm   
        else if (currentHour === 9){
            weatherHourOne.innerHTML = `${currentHour + 1}am`;
            weatherHourTwo.innerHTML = `${currentHour + 2}am`;
            weatherHourThree.innerHTML = `${currentHour + 3}pm`;
        } else if (currentHour === 10){
            weatherHourOne.innerHTML = `${currentHour + 1}am`;
            weatherHourTwo.innerHTML = `${currentHour + 2}pm`;
            weatherHourThree.innerHTML = `${currentHour - 9}pm`;
        } else if (currentHour === 11){
            weatherHourOne.innerHTML = `${currentHour + 1}pm`;
            weatherHourTwo.innerHTML = `${currentHour - 10}pm`;
            weatherHourThree.innerHTML = `${currentHour - 9}pm`;
        }
        // handles noon hour
        else if (currentHour === 12){
            weatherHourOne.innerHTML = `${currentHour - 11}pm`;
            weatherHourTwo.innerHTML = `${currentHour - 10}pm`;
            weatherHourThree.innerHTML = `${currentHour - 9}pm`;
        }
        //  handles regular hourly time
        else { 
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
        //alert('could not load weather data');
        weatherDisplay404();
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
    let previousCity = weatherCurrentCity.innerHTML;
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
            weatherCurrentCity.innerHTML = previousCity;
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

// refreshes the time every minute to see if a new hour has passed to update the hourly weather; 
window.setInterval(()=> {
    let now = new Date().getHours();
    if (now > 12){
        now -= 12;
    }
    let nextHour;
    let a = weatherHourOne.innerHTML.split('')
    if (a.length === 4){
        nextHour = +[a[0], a[1]].join('');
    } else {
        nextHour = +a[0];
    }
    if (now === nextHour){
        getCitySearchCurrentsFunc();
    }
    console.log([now, nextHour]);
}, 60000)

// runs on page load to get austin weather
weatherGetCurrentsFunc();





// ****************** clock section below *********************

let alarm = new Audio('sounds/alarm.mp3');
const clockAlarmFunc = () => alarm.play();
const stopAlarmFunc = () => alarm.pause();

let timerDownSound = new Audio('sounds/timerDownSound.mp3');
const startTimerDownAudio = () => timerDownSound.play();
const stopTimerDownAudio = () => timerDownSound.pause();

let pomoSound = new Audio('sounds/pomoTimerSound.mp3');
const startPomoAudio = () => pomoSound.play();
const stopPomoAudio = () => pomoSound.pause();

let clockDigit1 = document.getElementById('clockDigit1');
let clockDigit2 = document.getElementById('clockDigit2');
let clockDigit3 = document.getElementById('clockDigit3');
let clockDigit4 = document.getElementById('clockDigit4');
let clockDigitSeconds1 = document.getElementById('clockDigitSecs1');
let clockDigitSeconds2 = document.getElementById('clockDigitSecs2');
let clockAP = document.getElementById('clockAP');

let clockAlarmIcon = document.getElementById('clockAlarmIcon');
let clockTimerIcon = document.getElementById('clockTimerIcon');
let clockPomoIcon = document.getElementById('clockPomoIcon');

//let clockAlarmSettings = document.getElementById('clockAlarmSettings');
let clockInputTime = document.getElementById('clockInputTime');
let clockAlarmSetButton = document.getElementById('clockAlarmSetButton');
let clockAlarmRecall = document.getElementById('clockAlarmRecall');
let clockEndAlarm = document.getElementById('clockEndAlarm');

let clockTimerHeader = document.getElementById('clockTimerHeader');
let clockTimerUp = document.getElementById('clockTimerUp');
let clockTimerInputUp = document.getElementById('clockTimerInputUp');
let clockTimerInputDown = document.getElementById('clockTimerInputDown');
let clockTimerStart = document.getElementById('clockTimerStart');
let clockTimerReset = document.getElementById('clockTimerReset');
let clockTimerStop = document.getElementById('clockTimerStop');
let clockTimerEnd = document.getElementById('clockTimerEnd');



let clockTimerDown = document.getElementById('clockTimerDown');


let alarmActive = false;
let timerActive = false;
let pomoActive = false;


window.setInterval(()=>{
    let date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    let pm = false;

    if (hour === 12){
        pm = true;
    } else if (hour > 12){
        hour -= 12;
        pm = true;
    }
    
    let hourArr = ('' + hour).split('');
    let minArr = ('' + min).split('');
    let secArr = ('' + sec).split('');

    //console.log(hourArr) 
    if (hourArr.length === 1 && hour === 0){
        clockDigit1.innerHTML = '1';
        clockDigit2.innerHTML = '2';
    } else if (hourArr.length === 1){
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
        clockAP.innerHTML = 'p';
    } else {
        clockAP.innerHTML = 'a';
    }

    clockM.innerHTML = 'm';
}, 1000);

// hide and show icons on main page below 
const hideSettingsIconsFunc = () => {
    clockAlarmIcon.style.display = 'none';
    clockTimerIcon.style.display = 'none';
    clockPomoIcon.style.display = 'none';
}

const showSettingsIconsFunc = () => {
    clockAlarmIcon.style.display = 'block';
    clockTimerIcon.style.display = 'block';
    clockPomoIcon.style.display = 'block';
}

// Alarm functionality below 
const showAlarmSettings = () =>{
    hideSettingsIconsFunc();
    clockAlarmHeader.style.display = 'block';
    clockSetTime.style.display = 'block';
    clockAlarmSetButton.style.display = 'block';
} 

const hideAlarmSettings = () =>{
    clockAlarmHeader.style.display = 'none';
    clockSetTime.style.display = 'none';
    clockAlarmSetButton.style.display = 'none';
    showSettingsIconsFunc();
}

// hides timer recall buttons so you can set the alarm. 
clockAlarmIcon.addEventListener('click', ()=> {
    showAlarmSettings();
    hideTimerButtons();
    pomoEndButton.style.display = 'none';
})

clockAlarmSetButton.addEventListener('click', ()=> {
    hideAlarmSettings();
    clockAlarmRecall.style.display = 'block';
    let time = clockInputTime.value.split(':');
    let m = 'am';
    
    if (time[0] === '12'){
        m = 'pm';
    } else if (+time[0] > 12){
        time[0] -= 12;
        m = 'pm';
    } else if (time[0] === '00'){
        time[0] = '12';
    }
    
    clockAlarmRecall.innerHTML = `${time.join(':')} ${m}`;
   
    // handles times with  without a zero in front like 9:44 pm 
    if (clockAlarmRecall.innerHTML.length === 7){
        clockAlarmRecall.innerHTML = `0${time.join(':')} ${m}`;
    }
   
    //should work with the {1,2} investigate further
    let regValidateTime = /\d{1,2}:\d{2}\s[apAP]M/i;
    
    if (!clockAlarmRecall.innerHTML.match(regValidateTime)){
        alarmActive = false;
        clockAlarmRecall.style.display = 'none';
        alert('invalid time');
    } else {
        clockEndAlarm.style.display = 'block';
        clockAlarmRecall.style.display = 'block';
        clockAlarmIcon.style.backgroundColor = 'yellow';
    }
})

// POM CODE NEEDS TO BE ADDED HERE IF POMO ACTIVE AND ALARM SETTINGS COVER IT 
// sets the alarm. setInterveral checks for alarm time to match real time.  
let setTheAlarm;
clockAlarmSetButton.addEventListener('click', ()=>{
    alarmActive = true;
    if (timerActive || timerDownActive){
        showTimerButtons();
    }
    if (pomoActive){
        pomoWorkIcon.style.display = 'block';
        pomoEndButton.style.display = 'block';
    }
    if (pomoBreakActive){
        pomoBreakIcon.style.display = 'block';
        pomoEndButton.style.display = 'block';
    }
    let a = clockAlarmRecall.innerHTML.split('');
    let count = 0;
   
    setTheAlarm = setInterval(() => {
    let alarm = false;

    if (count === 0 && a[0] === '0' && clockDigit1.innerHTML === '' && a[1] === clockDigit2.innerHTML && a[3] === clockDigit3.innerHTML && a[4] === clockDigit4.innerHTML && a[a.length-2] === clockAP.innerHTML){
        alarm = true;
    } else if (count === 0 && a[0] === clockDigit1.innerHTML && a[1] === clockDigit2.innerHTML && a[3] === clockDigit3.innerHTML && a[4] === clockDigit4.innerHTML && a[a.length-2] === clockAP.innerHTML){
        alarm = true;
    }
    if (alarm === true && count === 0){
       clockAlarmFunc();
       count++;
    }

    }, 1000);
})

// stops / cancels alarm
clockEndAlarm.addEventListener('click', ()=>{
    alarmActive = false;
    clockAlarmIcon.style.pointerEvents = 'auto';
   
    clearInterval(setTheAlarm);
    stopAlarmFunc();

    clockAlarmRecall.style.display = 'none';
    clockEndAlarm.style.display = 'none';
    clockAlarmIcon.style.backgroundColor = '#bc4555'
})

// refactored timer section below ******************************************************************
let timerDownHour = document.getElementById('timerDownHour');
let timerDownMin = document.getElementById('timerDownMin');
let timerDownSec = document.getElementById('timerDownSec');
let timerDownHour1 = document.getElementById('timerDownHour1');
let timerDownMin1 = document.getElementById('timerDownMin1');
let timerDownSec1 = document.getElementById('timerDownSec1');
let clockTimerDownRecall = document.getElementById('clockTimerDownRecall');
let timerDownActive = false;

clockTimerIcon.addEventListener('click', ()=> {
    clockEndAlarm.style.display = 'none';
    pomoEndButton.style.display = 'none';
    if (timerUpReady){
        showTimerSettings();
        console.log('t up ready')
    }
    if (timerDownReady){
        console.log('t down ready')
        hideSettingsIconsFunc();
        clockTimerHeader.style.display = 'block';
        clockTimerUp.style.display = 'block';
        clockTimerDown.style.display = 'block';
        clockTimerStart.style.display = 'block';
    
        clockTimerInputDown.style.display = 'block';
        clockTimerInputDown.innerHTML = `<input id="timerDownHour1" class="timerDownSettings" type="number" max="60" min="0" placeholder="00">
                <input id="timerDownMin1" class="timerDownSettings" type="number" max="60" min="0" placeholder="00">
                <input id="timerDownSec1" class="timerDownSettings" type="number" max="60" min="0" placeholder="00">`
    }
}) 

const showTimerSettings = () =>{
    hideSettingsIconsFunc();
    clockTimerHeader.style.display = 'block';
    clockTimerUp.style.display = 'block';
    clockTimerDown.style.display = 'block';
    clockTimerStart.style.display = 'block';
    clockTimerInputUp.style.display = 'block';
} 

const hideTimerSettings = () =>{
    showSettingsIconsFunc();
    clockTimerHeader.style.display = 'none';
    clockTimerUp.style.display = 'none';
    clockTimerDown.style.display = 'none';
    clockTimerStart.style.display = 'none';
}

const showTimerDownSettings = () => {
    timerDownHour.style.display = 'block';
    timerDownMin.style.display = 'block';
    timerDownSec.style.display = 'block';
}

const hideTimerDownSettings = () => {
    timerDownHour.style.display = 'none';
    timerDownMin.style.display = 'none';
    timerDownSec.style.display = 'none';
}

let timerUpReady = true;
clockTimerUp.addEventListener('click', ()=>{
    timerUpReady = true;
    timerDownReady = false;

    clockTimerInputUp.style.display = 'block'
    clockTimerUp.style.backgroundColor = 'yellow';
    
    clockTimerInputDown.style.display = 'none'
    clockTimerDown.style.backgroundColor = '#bc4555';
})

let timerDownReady = false
clockTimerDown.addEventListener('click', ()=>{
    timerDownReady = true;
    timerUpReady = false;

    clockTimerInputUp.style.display = 'none';
    clockTimerUp.style.backgroundColor = '#bc4555';

    clockTimerInputDown.style.display = 'block';
    clockTimerDown.style.backgroundColor = 'yellow';
})

const showTimerButtons = () => {
    clockTimerReset.style.display = 'block';
    clockTimerStop.style.display = 'block';
    clockTimerEnd.style.display = 'block';
}

const hideTimerButtons = () => {
    clockTimerReset.style.display = 'none';
    clockTimerStop.style.display = 'none';
    clockTimerEnd.style.display = 'none';
}

clockTimerStart.addEventListener('click', ()=>{
    if (alarmActive){
        clockEndAlarm.style.display = 'block';
    }
    if (pomoActive || pomoBreakActive){
        pomoEndButton.style.display = 'block';
    }

    clockTimerIcon.style.pointerEvents = 'none';
    clockTimerIcon.style.backgroundColor = 'yellow';
    if (timerUpReady){
        if (!timerActive){
            timerActive = true;
            hideTimerSettings();
            showTimerButtons();
            timerStartFunc();
        } else {
            console.log('could not start timer up');
        }
    } 
    ////// timer down code here
    if (timerDownReady) {
        if (!timerDownActive && timerDownWasReset){
            timerDownActive = true;
            hideTimerSettings();
            showTimerButtons();
            
            let hour = document.getElementById('timerDownHour1');
            let min = document.getElementById('timerDownMin1');
            let sec = document.getElementById('timerDownSec1');
            countDownFunc(hour.value, min.value, sec.value);
            clockTimerDownRecall.style.display = 'block';
        }
        if (!timerDownActive && !timerDownWasReset){
            timerDownActive = true;
            hideTimerSettings();
            showTimerButtons();
            countDownFunc();
        }
    }
})

// still need to add reset condiions
let downPauseAfterReset = false;
clockTimerStop.addEventListener('click', ()=> {
    if (timerUpReady){
        console.log('up code here');
        let a = timeElapsed.split(':')
        if (timerActive){
            timerActive = false;
            clearInterval(startTheTimer);
            clockTimerStop.innerHTML = 'start'
        } else if (!timerActive && timerUpWasReset){
            timerUpWasReset = false;
            timerActive = true;
            timerStartFunc();
            clockTimerStop.innerHTML = 'stop';
        } else if (!timerActive){
            timerActive = true;
            timerStartFunc(+a[0], +a[1], +(`${+a[2] + 1}`));
            clockTimerStop.innerHTML = 'stop';
        }
    }

    if (timerDownReady){
        if (!timerDownActive && timerDownWasReset && downPauseAfterReset){
            let a = timeRemaining.split(':');
            timerDownActive = true;
            countDownFunc(+a[0], +a[1], +a[2] - 1);
            clockTimerStop.innerHTML = 'stop';
        } else if (!timerDownActive && timerDownWasReset){
            console.log('n the right place');
            let hour = document.getElementById('timerDownHourReset');
            let min = document.getElementById('timerDownMinReset');
            let sec = document.getElementById('timerDownSecReset');
            timerDownActive = true;
            countDownFunc(+hour.value, +min.value, +sec.value);
            clockTimerDownRecall.style.display = 'block';
            clockTimerStop.innerHTML = 'stop';
        } else if (timerDownActive && timerDownWasReset){
            console.log('edge case here')
            timeRemaining = clockTimerDownRecall.innerHTML;
            clearInterval(startDownTimer);
            clockTimerDownRecall.innerHTML = timeRemaining;
            timerDownActive = false
            clockTimerStop.innerHTML = 'start'

            downPauseAfterReset = true;

            clockTimerReset.style.display = 'none';

        } else if (!timerDownActive && !timerDownWasReset){
            let a = timeRemaining.split(':');
            timerDownActive = true;
            countDownFunc(+a[0], +a[1], +a[2] - 1);
            console.log('subtracting here?')
            clockTimerStop.innerHTML = 'stop';
        } else if (timerDownActive){
            timeRemaining = clockTimerDownRecall.innerHTML;
            clearInterval(startDownTimer);
            clockTimerDownRecall.innerHTML = timeRemaining;
            timerDownActive = false;
            clockTimerStop.innerHTML = 'start';
        }
    }
})

clockTimerEnd.addEventListener('click', ()=> {
    clockTimerIcon.style.pointerEvents = 'auto';
    clockTimerIcon.style.backgroundColor = '#bc4555';
    hideTimerButtons();
    timerActive = false;
    timerDownActive = false;
    clockTimerInputDown.style.display = 'none';
    if (timerUpReady){
        clearInterval(startTheTimer);
        clockTimerInputUp.style.display = 'none';
        clockTimerInputUp.innerHTML = '00:00:00';
        timerUpWasReset = true;
    }
    if (timerDownReady){
        clearInterval(startDownTimer);
        clockTimerDownRecall.style.display = 'none';
        timerDownWasReset = true;
    }
})

// reset and end will have the same functionality
let timerUpWasReset = false;
let timerDownWasReset = false;

clockTimerReset.addEventListener('click', ()=>{
    timerActive = false;
    timerDownActive = false;
    if (timerUpReady){
        clearInterval(startTheTimer);
        clockTimerInputUp.innerHTML = '00:00:00';
        clockTimerStop.innerHTML = 'start';
        timerUpWasReset = true;
    }
    if (timerDownReady){
        clearInterval(startDownTimer);
        clockTimerStop.innerHTML = 'start';
        clockTimerDownRecall.style.display = 'none';
        timerDownWasReset = true;

        clockTimerInputDown.style.display = 'block';
        clockTimerInputDown.innerHTML = `<input id="timerDownHourReset" class="timerDownSettings" type="number" max="60" min="0" placeholder="00">
                <input id="timerDownMinReset" class="timerDownSettings" type="number" max="60" min="0" placeholder="00">
                <input id="timerDownSecReset" class="timerDownSettings" type="number" max="60" min="0" placeholder="00">`
    }
})


// timer UP func
let startTheTimer;
let timeElapsed;
function timerStartFunc(hour = 0, min = 0, sec = 1){
    if (timerActive){
        startTheTimer = setInterval(() => {
            if (sec === 60){
                sec = 0;
                min++;
            } else if (min === 60){
                min = 0;
                hour++;
            }

            if (('' + hour).length === 1){
                hour = '0' + hour;
            }
            if (('' + min).length === 1) {
                min = '0' + min;
            }
            if (('' + sec).length === 1){
                sec = `0${sec}`;
            }
            timeElapsed = [hour, min, sec].join(':');
            clockTimerInputUp.innerHTML = timeElapsed;
            sec++;
        }, 1000);
    } else {
        clearInterval(startTheTimer);
    }
}   

//  timer DOWN func
let startDownTimer;
let timeRemaining;
function countDownFunc(hour = +(timerDownHour.value), min = +(timerDownMin.value), sec = +(timerDownSec.value)){
    if (timerDownActive){
        hideTimerDownSettings();
        clockTimerInputDown.style.display = 'none';
            startDownTimer = setInterval(()=>{
                if (hour > 0 && min === 0 && sec === -1 || hour === '1' && min == '' && sec === -1){
                    hour--;
                    min = 59;
                    sec = 59;
                } else if (min > 0 && sec === -1){
                    min--;
                    sec = 59;
                } else if (hour === 0 && min === 0 & sec === 0){
                    startTimerDownAudio();
                    clearInterval(startDownTimer);
                    hour = `00`;
                    min = `00`;
                    sec = `00`;
                }
                let a = [hour, min, sec].map(e=> ('' + e).length === 0 ? `00` :
                        ('' + e).length === 1 ? `0${e}` : e);
                clockTimerDownRecall.innerHTML = `${a[0]}:${a[1]}:${a[2]}`;
                if (clockTimerDownRecall.innerHTML === `00:00:00`){
                    clearInterval(startDownTimer);
                    startTimerDownAudio();
                }
                sec--;
            }, 1000);
    } else {
        clearInterval(startDownTimer);
    }
}



// *********** pomo settings below *****************************************************

// need to reveal pomo settings all are display none currently 
let clockPomoHeader = document.getElementById('clockPomoHeader');
let pomoWorkLabel = document.getElementById('pomoWorkLabel');
let pomoBreakLabel = document.getElementById('pomoBreakLabel');
let pomoWorkInput = document.getElementById('pomoWorkInput');
let pomoBreakInput = document.getElementById('pomoBreakInput');
let pomoWorkInc = document.getElementById('pomoWorkInc');
let pomoBreakInc = document.getElementById('pomoBreakInc');
let pomoWorkDec = document.getElementById('pomoWorkDec');
let pomoBreakDec = document.getElementById('pomoBreakDec');
let pomoStartButton = document.getElementById('pomoStartButton');

let pomoRecall = document.getElementById('pomoRecall');
let pomoEndButton = document.getElementById('pomoEndButton');

let pomoWorkIcon = document.getElementById('pomoWorkIcon');
let pomoBreakIcon = document.getElementById('pomoBreakIcon');


const showPomoSettings = () =>{
    hideSettingsIconsFunc();
    clockPomoHeader.style.display = 'block';
    pomoWorkLabel.style.display = 'block';
    pomoBreakLabel.style.display = 'block';
    pomoWorkInput.style.display = 'block';
    pomoBreakInput.style.display = 'block';
    pomoWorkInc.style.display = 'block';
    pomoBreakInc.style.display = 'block';
    pomoWorkDec.style.display = 'block';
    pomoBreakDec.style.display = 'block';
    pomoStartButton.style.display = 'block';
} 

const hidePomoSettings = () => {
    showSettingsIconsFunc();
    clockPomoHeader.style.display = 'none';
    pomoWorkLabel.style.display = 'none';
    pomoBreakLabel.style.display = 'none';
    pomoWorkInput.style.display = 'none';
    pomoBreakInput.style.display = 'none';
    pomoWorkInc.style.display = 'none';
    pomoBreakInc.style.display = 'none';
    pomoWorkDec.style.display = 'none';
    pomoBreakDec.style.display = 'none';
    pomoStartButton.style.display = 'none';
}

clockPomoIcon.addEventListener('click', ()=> {
    showPomoSettings();
    if (timerActive || timerDownActive){
        hideTimerButtons();
    }
})

let workIncs = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
let workStartIndex = 4;
pomoWorkInput.innerHTML = workIncs[workStartIndex];

let breakIncs = [5, 10, 15];
let breakStartIndex = 0;
pomoBreakInput.innerHTML = breakIncs[breakStartIndex];

pomoWorkInc.addEventListener('click', ()=>{
    if (workStartIndex <= 10){
        pomoWorkInput.innerHTML = workIncs[workStartIndex + 1];
        workStartIndex++;
    } else {
        pomoWorkInput.innerHTML = 60; 
    }
})

pomoBreakInc.addEventListener('click', ()=>{
    if (breakStartIndex <= 1){
        pomoBreakInput.innerHTML = breakIncs[breakStartIndex + 1];
        breakStartIndex++;
    } else {
        pomoBreakInput.innerHTML = breakIncs[breakIncs.length -1];
    }
})

pomoWorkDec.addEventListener('click', ()=>{
    if (workStartIndex >= 1){
        pomoWorkInput.innerHTML = workIncs[workStartIndex-1];
        workStartIndex--;
    } else {
        pomoWorkInput.innerHTML = 5;
    }
})

pomoBreakDec.addEventListener('click', ()=>{
    if (breakStartIndex >= 1){
        pomoBreakInput.innerHTML = breakIncs[breakStartIndex-1];
        breakStartIndex--;
    } else {
        pomoBreakInput.innerHTML = 5;
    }
})

const showPomoRecall = () => {
    clockPomoIcon.pointerEvents = 'none';
    pomoRecall.style.display = 'block';
    pomoEndButton.style.display = 'block';
}

const hidePomoRecall = () => {
    pomoRecall.style.display = 'none';
    pomoEndButton.style.display = 'none';
}

let startPomoTimer;
let startPomoBreakTimer;
let pomoBreakActive = false;
// if alarm / timer are active display their recalls 
pomoStartButton.addEventListener('click', ()=> {
    pomoActive = true;
    pomoWorkIcon.style.display = 'block';
    clockPomoIcon.style.pointerEvents = 'none';
    clockPomoIcon.style.backgroundColor = 'yellow';
    hidePomoSettings();
    showPomoRecall();
    
    if (alarmActive){
        clockEndAlarm.style.display = 'block';
    }
    if (timerActive || timerDownActive){
        showTimerButtons();
    }

    pomoRecall.innerHTML = `${+(pomoWorkInput.innerHTML)}:00`;
        let min = +(pomoWorkInput.innerHTML);
        let sec = 0;
        startPomoTimer = setInterval(()=>{
             if (min === 0 && sec === 0){
                startPomoAudio();
                if (pomoActive){
                    pomoWorkIcon.style.display = 'none';
                    pomoBreakIcon.style.display = 'block';
                    min = +(pomoBreakInput.innerHTML);
                    pomoActive = false;
                    pomoBreakActive = true;
                } else {
                    pomoBreakIcon.style.display = 'none';
                    pomoWorkIcon.style.display = 'block';
                    min = +(pomoWorkInput.innerHTML);
                    pomoActive = true;
                    pomoBreakActive = false;
                }
            }           
            if (sec === 0){
                min--;
                sec = 59;
            }
            console.log(pomoActive);
            let a = [min, sec];
            if (('' + min).length === 1){
                a[0] = `0${a[0]}`;
            }
            if (('' + sec).length === 1){
                a[1] = `0${a[1]}`;
            }
            pomoRecall.innerHTML = `${a[0]}:${a[1]}`;

            sec --;
        }, 1000);
})

pomoEndButton.addEventListener('click', ()=>{
    clearInterval(startPomoTimer);
    pomoActive = false;
    pomoBreakActive = false;
    hidePomoRecall();
    pomoWorkIcon.style.display = 'none';
    pomoBreakIcon.style.display = 'none';
    clockPomoIcon.style.pointerEvents = 'auto';
    clockPomoIcon.style.backgroundColor = '#bc4555';
})


// *************** calculator below ***************************


let calcMemory = document.getElementById('calcMemory');
let calcMainInput = document.getElementById('calcMainInput');
let remainder = document.getElementById('remainder');
let round = document.getElementById('round');
let pi= document.getElementById('pi');
let clear = document.getElementById('clear');
let allClear = document.getElementById('allClear');
let seven = document.getElementById('seven');
let eight = document.getElementById('eight');
let nine = document.getElementById('nine');
let sqrt = document.getElementById('sqrt');
let pow = document.getElementById('pow');
let four = document.getElementById('four');
let five = document.getElementById('five');
let six = document.getElementById('six');
let divide = document.getElementById('divide');
let minus = document.getElementById('minus');
let one = document.getElementById('one');
let two = document.getElementById('two');
let three = document.getElementById('three');
let times = document.getElementById('times');
let plus = document.getElementById('plus');
let zero = document.getElementById('zero');
let decimal = document.getElementById('decimal');
let equal = document.getElementById('equal');



let lastClickEquals = false;
calculator.addEventListener('click', (e)=>{
    if (e.target === equal){
        lastClickEquals = true;
        console.log(lastClickEquals)
    } else {
        lastClickEquals = false;
    }
})

let lastClickPlus = false;
calculator.addEventListener('click', (e)=>{
    if (e.target === plus){
        lastClickPlus = true;
        plus.style.backgroundColor = 'yellow';
    } else {
        lastClickPlus = false;
        plus.style.backgroundColor = '#bc4555';
    }
})

let lastClickMinus = false;
calculator.addEventListener('click', (e)=>{
    if (e.target === minus){
        lastClickMinus = true;
        minus.style.backgroundColor = 'yellow';
    } else {
        lastClickMinus = false;
        minus.style.backgroundColor = '#bc4555';
    }
})


let lastClickTimes = false;
calculator.addEventListener('click', (e)=>{
    if (e.target === times){
        lastClickTimes = true;
        times.style.backgroundColor = 'yellow';
    } else {
        lastClickTimes = false;
        times.style.backgroundColor = '#bc4555';
    }
})

let lastClickDivide = false;
calculator.addEventListener('click', (e)=>{
    if (e.target === divide){
        lastClickDivide = true;
        divide.style.backgroundColor = 'yellow';
    } else {
        lastClickDivide = false;
        divide.style.backgroundColor = '#bc4555';
    }
})

let lastClickPow = false;
calculator.addEventListener('click', (e)=>{
    if (e.target === pow){
        lastClickPow = true;
        pow.style.backgroundColor = 'yellow';
    } else {
        lastClickPow = false;
        pow.style.backgroundColor = '#bc4555';
    }
})

let lastClickRemainder = false;
calculator.addEventListener('click', (e)=>{
    if (e.target === remainder){
        lastClickRemainder = true;
        remainder.style.backgroundColor = 'yellow';
    } else {
        lastClickRemainder = false;
        remainder.style.backgroundColor = '#bc4555';
    }
})

let lastClickOperand = false;
calculator.addEventListener('click', (e)=>{
    if (e.target === plus || e.target === times || e.target === minus || e.target === divide || e.target === calculator){
        lastClickOperand = true;
    } else {
        lastClickOperand = false;
    }
    if (lastClickOperand) {
        plus.style.pointerEvents = 'none';
        times.style.pointerEvents = 'none';
        minus.style.pointerEvents = 'none';
        divide.style.pointerEvents = 'none';
    } else {
        plus.style.pointerEvents = 'auto';
        times.style.pointerEvents = 'auto';
        minus.style.pointerEvents = 'auto';
        divide.style.pointerEvents = 'auto';
    }
})

calculator.addEventListener('click', (e)=>{
    if (e.target === decimal || calcMainInput.innerHTML.includes('.')){
        decimal.style.pointerEvents = 'none';
    } else {
        decimal.style.pointerEvents = 'auto';
    }
})

const refreshOutput = () => calcMainInput.innerHTML === '0' ? calcMainInput.innerHTML = '' : calcMainInput; 

const assignInputChar = (char) => {
    if (lastClickEquals){
        calcMainInput.innerHTML = `${char}`;
    } else {
        calcMainInput.innerHTML += `${char}`;
    }
}

// MAIN COMPUTE FUNCTION HERE
let eq = calcMainInput.innerHTML;
const compute = () => {
    eq = calcMainInput.innerHTML;
    console.log(eq);
    if (eq.includes('x')){
        eq = eq.replaceAll('x', '*');
    }
    if (eq.includes('÷')){
        eq = eq.replaceAll('÷', '/');
    }
    if (eq.includes('^')){
        eq = eq.replaceAll('^', '**');
    }
    if (eq.includes('π')){
        eq = eq.replaceAll('π', 'Math.PI')
    }
    console.log(eq);
    calcMainInput.innerHTML = eval(eq);
}


remainder.addEventListener('click', ()=> {
    calcMainInput.innerHTML += '%';
})

round.addEventListener('click', ()=> {
    let temp = calcMainInput.innerHTML; 
    calcMainInput.innerHTML = Math.round(+temp);
})

pi.addEventListener('click', ()=> {
    refreshOutput();
    calcMainInput.innerHTML += 'π';
})

allClear.addEventListener('click', ()=> {
    calcMainInput.innerHTML = 0;
})

seven.addEventListener('click', ()=> {
    refreshOutput();
    assignInputChar('7');
})

eight.addEventListener('click', ()=> {
    refreshOutput();
    assignInputChar('8');
})

nine.addEventListener('click', ()=> {
    refreshOutput();
    assignInputChar('9');
})

sqrt.addEventListener('click', ()=> {
    let temp = calcMainInput.innerHTML;
    calcMainInput.innerHTML = eval(Math.sqrt(+temp));
})

pow.addEventListener('click', ()=> {
    calcMainInput.innerHTML += '^';
})

four.addEventListener('click', ()=> {
    refreshOutput();
    assignInputChar('4');
})

five.addEventListener('click', ()=> {
    refreshOutput();
    assignInputChar('5');
})

six.addEventListener('click', ()=> {
    refreshOutput();
    assignInputChar('6');
})

divide.addEventListener('click', ()=> {
    calcMainInput.innerHTML += '÷';
})

minus.addEventListener('click', ()=> {
    calcMainInput.innerHTML += '-';
})

one.addEventListener('click', ()=> {
    refreshOutput();
    assignInputChar('1');
})

two.addEventListener('click', ()=> {
    refreshOutput();
    assignInputChar('2');
})

three.addEventListener('click', ()=> {
    refreshOutput();
    assignInputChar('3');
})

times.addEventListener('click', ()=> {
    calcMainInput.innerHTML += 'x';
})

plus.addEventListener('click', ()=> {
    calcMainInput.innerHTML += '+';
})

zero.addEventListener('click', ()=> {
    refreshOutput();
    assignInputChar('0');
})

decimal.addEventListener('click', ()=> {
    refreshOutput();
    assignInputChar('.');
})

equal.addEventListener('click', ()=> {
    compute();
})


























