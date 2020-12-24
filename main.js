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
let weatherRefreshButton = document.getElementById('weatherRefreshButton');
let weatherEnterCity = document.getElementById('weatherEnterCity');
let weatherGoButton = document.getElementById('weatherGoButton');
let weatherCurrentTemp = document.getElementById('weatherCurrentTemp');
let weatherCurrentIcon = document.getElementById('weatherCurrentIcon');
let weatherCurrentDescription = document.getElementById('weatherCurrentDescription');
let weatherFeelsLike = document.getElementById('weatherFeelsLike');
let weatherWind = document.getElementById('weatherWind');
let weatherHumididty = document.getElementById('weatherHumidity');
let weatherHourOne = document.getElementById('weatherHourOne');

const weatherGetCurrentsFunc = () => {
fetch('https://api.openweathermap.org/data/2.5/onecall?lat=30.382580&lon=-97.710243&units=imperial&appid=89487f45423ccbfbdd6e1ea526f5177f')
    .then(response=> response.json())
    .then(data=> {
        console.log(data);
        
        let temp = data.current.temp;
        let icon = data.current.weather[0]['icon'];
        let description = data.current.weather[0]['description'];
        let feelsLike = data.current.feels_like;
        let wind = data.current.wind_speed;
        let humidity = data.current.humidity;

        weatherCurrentTemp.innerHTML = `${Math.round(temp)}\u00b0`;
        weatherCurrentIcon.innerHTML =  `<img src="http://openweathermap.org/img/wn/${icon}@2x.png">`
        weatherCurrentDescription.innerHTML = description;

        // ADD OTHER BACKGROUND OPTIONS BELOW
        if (description.includes('clear')){
            weather.style.backgroundImage = "url('pics/clearsky_hud.jpg')";
        } else if (description.includes('cloud')){
            weather.style.backgroundImage= "url('pics/clouds_hud.jpg')";
            weather.style.color = "whitesmoke";
        } else if (description.includes('rain') || description.includes('drizzle')){
            weather.style.backgroundImage = "url('pics/rain_hud.jpg')";
            weather.style.color = "whitesmoke";
        } else if (description.includes('storm')){
            weather.style.backgroundImage = "url('pics/storm_hud.jpg')";
            weather.style.color = "whitesmoke";
        } else if (description.includes('snow')){
            weather.style.backgroundImage = "url('pics/snow_hud.jpg')";
            weather.style.color = "whitesmoke";
        } else if (description.includes('mist')){
            weather.style.backgroundImage = "url('pics/mist_hud.jpg')";
            weather.style.color = "whitesmoke";
        } else if (description.includes('fog')){
            weather.style.backgroundImage = "url('pics/fog_hud.jpeg')";
        }
        
        weatherFeelsLike.innerHTML = `feels like ${Math.round(feelsLike)}\u00b0`;
        weatherWind.innerHTML = `wind ${Math.round(wind)}mph`;
        weatherHumididty.innerHTML = `humidity ${humidity}%`;

        let timestamp = data.hourly[0]['dt'];
        let date = new Date(timestamp * 1000);
        let pm = false;
        let currentHour = date.getHours();
        if (currentHour > 12){
            currentHour -= 12;
            pm = true;
        }
        weatherHourOne.innerHTML = pm === true ? `${currentHour + 1}pm` : `${currentHour + 1}am`;
        weatherHourTwo.innerHTML = pm === true ? `${currentHour + 2}pm` : `${currentHour + 2}am`;
        weatherHourThree.innerHTML = pm === true ? `${currentHour + 3}pm` : `${currentHour + 3}am`;

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
    .catch(errror=> console.error('problem occured'))
}


weatherRefreshButton.addEventListener('click', ()=> {
    weatherGetCurrentsFunc();
})

const weatherTimeRefreshFunc = () => {
    let now = new Date();
    let pm = false;
    let currentHour = now.getHours();
        if (currentHour > 12){
            currentHour -= 12;
            pm = true;
        }
    return pm === true ? `${currentHour}pm` : `${currentHour}am`;
}


// ********* running on page load **************
weatherGetCurrentsFunc();
let startupTime = weatherTimeRefreshFunc();

window.setInterval(()=> {
    if (startupTime !== weatherTimeRefreshFunc()){
        weatherGetCurrentsFunc();
    }
}, 250000)
























































    //30.3871° N, 97.7037° W
//30.382580 -97.710243
// f = k × 9/5 - 459.67
/*
"id": 4671654,
        "name": "Austin",
        "state": "TX",
        "country": "US",
        "coord": {
            "lon": -97.743057,
            "lat": 30.267151
*/

//weatherCurrentTemp.innerHTML =




