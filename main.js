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
let noteCount = 1;


// get the key for local storaget be a preview of the note
let notesNotePreview = notesTextBox.value;
console.log(notesNotePreview);

notesPostNoteButton.addEventListener('click', ()=> {
    if (notesTextBox.value !== ''){
        localStorage.setItem('key', notesTextBox.value);
        noteCount++;
    }
    return;
});

notesAddNote.addEventListener('click', ()=> {
    if (notesTextBox.value == ''){
        return;
    } else {
        localStorage.setItem(`note ${noteCount}`, notesTextBox.value);
        noteCount++;
    }
    notesTextBox.value = '';
})

notesViewNotesButton.addEventListener('click', ()=> {
   notesTextBox.style.display = 'none';
   notesNotesList.style.display = 'block'; 

});
    