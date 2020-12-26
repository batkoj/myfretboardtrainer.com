<script>
    import { onMount } from 'svelte';
    import { fly, fade } from 'svelte/transition';
    import Fretboard from '../components/Fretboard.svelte';


    let options;
    let randomString;
    // using object because {note:"A"} != {note:"A"} - for transitions
    let randomNote = {note:""};
    let showSuccess = false;
    let successCounter = 0;
    let failureCounter = 0;
    let includeFlats = false;
    let numberOfFrets = "12";


    let allNoteLetters = ["C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "Ab/G#", "A", "A#/Bb", "B"];
    let notesLettersWithoutFlats = ["C", "D", "E", "F", "G", "A", "B"];

    onMount(async () => {
        let isChordMode = true;
        let isDisabled = false;
        
        let standardTuning = [{letter: "E", octave: 4}, {letter: "B", octave: 3}, {letter: "G", octave: 3}, {letter: "D", octave: 3}, {letter: "A", octave: 2}, {letter: "E", octave: 2}];

        let dimensionsFunc = function ($fretboardContainer, $fretboardBody, settings) {
            let width = jQuery(window).width();
            let height;

            if (width <= 768) {
                height = settings.tuning.length * 26;
            } else {
                height = settings.tuning.length * 32;
            }

            return {
                height: height
            };
        };
        let noteCircles = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24];
        let intervals = ["1", "b2", "2", "b3", "3", "4", "b5", "5", "b6", "6", "b7", "7"];
        let root = "C";
        let animationSpeed = 400; // ms
        let noteMode = "letter"; // or "interval"



        let clickedNotesChangedFunc = function () {
            let $fretboard = jQuery(".my-fretboard-js");
            let api = $fretboard.data("api");
            let clickedNotes = api.getClickedNotes();
            let clickedNoteLetters = clickedNotes.map(function (e) {
                return e.notes[0].letter;
            });

            let first = clickedNotes[0];
            if (first != null) {
                let clickedString = first.string;
                if (clickedNoteLetters[0] === randomNote.note && randomString === getStringNumber(clickedString)) {
                    showSuccess = true;
                    successCounter++;
                    afterFretboardInit();

                    setTimeout(function () {
                        api.clearClickedNotes();
                        showSuccess = false;
                    }, 1000);

                } else {
                    failureCounter++;
                    setTimeout(function () {
                        api.clearClickedNotes();
                    }, 400);
                }
            }
        }

        options = {
            tuning: standardTuning,
            numFrets: parseInt(numberOfFrets),
            isChordMode: isChordMode,
            noteClickingDisabled: isDisabled,
            noteLetters: allNoteLetters,
            noteMode: noteMode,
            intervals: intervals,
            root: root,
            animationSpeed: animationSpeed,
            noteCircles: noteCircles,
            dimensionsFunc: dimensionsFunc,
            notesClickedCallback: clickedNotesChangedFunc
        };

    });
    
    
    let afterFretboardInit = () => {
        highlightRandomString();
        pickRandomNote(includeFlats);
    }

    let highlightRandomString = () => {
        // jQuery(".string").css("background-color", "white");
        const allStrings = document.querySelectorAll(".string");
        allStrings.forEach(x => {
            x.style.backgroundColor = "white";
            x.style.height = "1px";
        });
        randomString = Math.floor(Math.random() * 6) + 1;
        // jQuery("#string" + randomString).css("background-color", "#00d5ff");
        let string = document.querySelector("#string" + randomString);
        string.style.backgroundColor = "#00d5ff";
        string.style.height = "3px";
    }

    let pickRandomNote = (includeFlats) => {
        let notesToPickFrom = includeFlats ? allNoteLetters : notesLettersWithoutFlats;
        randomNote.note = notesToPickFrom[Math.floor(Math.random() * notesToPickFrom.length)];
    }
   
    let getStringNumber = (string) => {
        if (string.letter === 'E') {
            if (string.octave === 2) {
                return 6;
            } else {
                return 1;
            }
        } else if (string.letter === 'B') {
            return 2;
        } else if (string.letter === 'G') {
            return 3;
        } else if (string.letter === 'D') {
            return 4;
        } else if (string.letter === 'A') {
            return 5;
        }
    }

    $: successPercentage = (successCounter + failureCounter != 0) ? Math.floor(successCounter * 100 / (successCounter + failureCounter)) : 0;

    $: pickRandomNote(includeFlats);

    $: {
        if (options != null) {
            options.numFrets = parseInt(numberOfFrets);
        }
    }
</script>

<svelte:head>
    <title>Note selection</title>
</svelte:head>

<main>
    <h1>Note selection</h1>
    <div>Select note on the highlighted string:</div>
    {#key randomNote}
        <div class="randomNote" in:fade="{{duration: 600}}">{randomNote.note}</div>
    {/key}
    {#key options}
        {#if options != undefined}
            <Fretboard options={options} on:fretboardInitialized={afterFretboardInit}/>
        {/if}
    {/key}


    <div style="visibility: {showSuccess ? 'visible' : 'hidden'}" id="success">
        CORRECT!
    </div>
    <span>{successCounter} / {failureCounter} ({successPercentage}%)</span>
    <div>
        Include flats/sharps: <input class="includeFlats" type=checkbox bind:checked={includeFlats}>
    </div>
    <div>
        Number of frets:
        <select class="selectbox" bind:value={numberOfFrets}>
            <option value="12">12</option>
            <option value="15">15</option>
            <option value="17">17</option>
            <option value="19">19</option>
            <option value="21">21</option>
        </select>
    </div>
</main>

<style>
    .randomNote {
        color: #1e8094;
        font-size: 1.5em;
    }

    #success {
        background-color: #79c779;
        color: white; 
        text-align: center;
    }

    .includeFlats {
        margin-top: 50px;
    }

    .selectbox {
        height: 24px;
        font-size: medium;
        background-color: #f9f9f9;
        width: 50px;
        text-align-last: right;
    }
</style>