<script>
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import Fretboard from '../components/Fretboard.svelte';
    import { standardTuning }  from './scalesDictionary.js';
    import { allNoteLetters, wholeNoteLetters, noteCircles, intervals } from './util.js';


    let options;
    // using object because {note:"A"} != {note:"A"} - for transitions
    let randomNote = {note:""};
    let showSuccess = false;

    let noteLettersToPickFrom = wholeNoteLetters;

    onMount(async () => {
        let isChordMode = true;
        let isDisabled = false;
        
        let numFrets = 12;
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
            
            const allEqual = clickedNoteLetters.every( x => x === clickedNoteLetters[0]);
            if (clickedNoteLetters.length === 6 && allEqual && clickedNoteLetters[0] === randomNote.note) {
                showSuccess = true;
                setTimeout(function () {
                    api.clearClickedNotes();
                    showSuccess = false;
                    pickRandomNote();
                }, 1900);
            }
        }

        options = {
            tuning: standardTuning,
            numFrets: numFrets,
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
        pickRandomNote();
        // document.querySelectorAll(".note-display").forEach(x => x.style.visibility = "hidden");
    }

    let pickRandomNote = () => {
        let temp = noteLettersToPickFrom[Math.floor(Math.random() * noteLettersToPickFrom.length)];
        while (temp === randomNote.note) {
            temp = noteLettersToPickFrom[Math.floor(Math.random() * noteLettersToPickFrom.length)];
        }
        randomNote.note = temp;
    }
</script>

<svelte:head>
    <title>Select all notes</title>
</svelte:head>

<main>
    <h1>Select the note's locations</h1>
    <div>Select the following note on all strings: </div>
    <!-- <img alt="refresh" src="refresh.png"> -->
    {#key randomNote}
        <div class="randomNote" in:fade="{{duration: 600}}">{randomNote.note}</div>
    {/key}
    {#if options != undefined}
        <Fretboard options={options} on:fretboardInitialized={afterFretboardInit}/>
    {/if}


    <div style="visibility: {showSuccess ? 'visible' : 'hidden'}" id="success">
        CORRECT!
    </div>
</main>


<style>
    /* img {
        width: 25px;
        cursor: pointer;
    } */

    .randomNote {
        color: #1e8094;
        font-size: 1.5em;
    }

    #success {
        background-color: #79c779;
        color: white; 
        text-align: center;
    }
</style>