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


// *** notes section below *** 
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









