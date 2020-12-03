<!-- <script lang="typescript"> -->
<script>
    import { onMount } from 'svelte';
    import { fly, fade } from 'svelte/transition';
    import Fretboard from '../components/Fretboard.svelte';

    let options;
    let randomNoteLetter;
    let showSuccess = false;
    let successCounter = 0;
    let failureCounter = 0;
    
    let standardTuning = [{letter: "E", octave: 4}, {letter: "B", octave: 3}, {letter: "G", octave: 3}, {letter: "D", octave: 3}, {letter: "A", octave: 2}, {letter: "E", octave: 2}];
    let allNoteLetters = ["C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "Ab/G#", "A", "A#/Bb", "B"];
    let wholeNoteLetters = ["C", "D", "E", "F", "G", "A", "B"];

    onMount(async () => {
        let isChordMode = true;
        let isDisabled = true;
        
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
        let noteCircles = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24];
        let intervals = ["1", "b2", "2", "b3", "3", "4", "b5", "5", "b6", "6", "b7", "7"];
        let root = "C";
        let animationSpeed = 400; // ms
        let noteMode = "letter"; // or "interval"
        let clickedNotesChangedFunc = () => {};

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
    
    
    function afterFretboardInit() {
        pickRandomNote();
        document.querySelectorAll(".note-display").forEach(x => x.style.visibility = "hidden");
    }
    
    function pickRandomNote() {
        let $fretboard = jQuery(".my-fretboard-js");
        let api = $fretboard.data("api");
        api.clearClickedNotes();
        
        let randomNote = pickNoteUntilWhole(api);

        api.setClickedNotes(randomNote);
    }

    function pickNoteUntilWhole(api) {
        let randomString = standardTuning[Math.floor(Math.random() * standardTuning.length)];
        let randomFret = Math.floor(Math.random() * 11);
        let randomNote = [{
            string: randomString, 
            notes: [{fret: randomFret}]
        }];

        randomNoteLetter = api.getNoteByFretNumber(randomString, randomFret).letter;
        if (!wholeNoteLetters.some( x => x === randomNoteLetter)) {
             return pickNoteUntilWhole(api)
        }
        return randomNote;
    }
    
    function handleClick(note) {
        if (note.note === randomNoteLetter) {
            showSuccess = true;
            successCounter++;
            document.querySelector("#button" + note.note).style.backgroundColor = "#79c779";
            pickRandomNote();
            setTimeout(function () {
                document.querySelectorAll("button").forEach(x => x.style.backgroundColor = "#efefef");
                showSuccess = false;
            }, 500);
        } else {
            document.querySelector("#button" + note.note).style.backgroundColor = "red";
            failureCounter++;
        }
    }


    $: successPercentage = (successCounter + failureCounter != 0) ? Math.floor(successCounter * 100 / (successCounter + failureCounter)) : 0;
</script>

<svelte:head>
    <title>Note identification</title>
</svelte:head>

<main>
    <h1>Note identification</h1>
    {#if options != undefined}
        <Fretboard options={options} on:fretboardInitialized={afterFretboardInit}/>
    {/if}
    
    <div style="visibility: {showSuccess ? 'visible' : 'hidden'}" id="success">
        CORRECT!
    </div>
    <span>{successCounter} / {failureCounter} ({successPercentage}%)</span>
    
    <div class="buttons">
        {#each wholeNoteLetters as note}
            <button id="button{note}" on:click={() => handleClick({note})}>{note}</button>
        {/each}
    </div>
</main>

<style>
    #success {
        background-color: #79c779;
        color: white; 
        text-align: center;
    }

    .buttons {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }

    @media screen and (min-width: 1400px) {
        .buttons {
            padding: 0px 400px;
        }
    }
</style>