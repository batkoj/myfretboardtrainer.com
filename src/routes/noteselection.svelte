<script>
    import { onMount } from 'svelte';
    import { fly, fade } from 'svelte/transition';
    import Fretboard from '../components/Fretboard.svelte';
    import { getStringNumber, allNoteLetters, wholeNoteLetters, noteCircles, intervals } from './util.js';
    import { standardTuning }  from './scalesDictionary.js';


    let options;
    let randomString;
    // using object because {note:"A"} != {note:"A"} - for transitions
    let randomNote = {note:""};
    let showSuccess = false;
    let successCounter = 0;
    let failureCounter = 0;
    let includeFlats = false;
    let numberOfFrets = "12";

    let allStringNumbers, stringsIncluded;
    allStringNumbers = stringsIncluded = [1, 2, 3, 4, 5, 6];

    onMount(async () => {
        let isChordMode = true;
        let isDisabled = false;
        
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
        highlightRandomString(stringsIncluded);
        pickRandomNote(includeFlats);
    }

    let highlightRandomString = (stringsIncluded) => {
        // jQuery(".string").css("background-color", "white");
        const allStrings = document.querySelectorAll(".string");
        allStrings.forEach(x => {
            x.style.backgroundColor = "white";
            x.style.height = "1px";
        });

        // randomString = Math.floor(Math.random() * 6) + 1;
        randomString = stringsIncluded[Math.floor(Math.random() * stringsIncluded.length)];
        let string = document.querySelector("#string" + randomString);
        string.style.backgroundColor = "#00d5ff";
        string.style.height = "3px";
    }

    let pickRandomNote = (includeFlats) => {
        let notesToPickFrom = includeFlats ? allNoteLetters : wholeNoteLetters;
        randomNote.note = notesToPickFrom[Math.floor(Math.random() * notesToPickFrom.length)];
    }

    function handleIncludedStringClick(stringNr) {
        stringNr = stringNr.stringNr;
        if (stringsIncluded.includes(stringNr)) {
            if (stringsIncluded.length === 1) return;
            stringsIncluded = stringsIncluded.filter(x => x != stringNr);
            document.querySelector("#button" + stringNr).classList.remove("pressed");
        } else {
            stringsIncluded.push(stringNr);
            document.querySelector("#button" + stringNr).classList.add("pressed");
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
    <div class="stringSelection">
        <span class="includeStringsText">Include strings:</span>
        <div class="stringButtons">
            {#each allStringNumbers as stringNr}
                <button class="pressed" id="button{stringNr}" on:click={() => handleIncludedStringClick({stringNr})}>{stringNr}</button>
            {/each}
        </div>
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
        margin-left: 10px;
    }

    .selectbox {
        height: 24px;
        font-size: medium;
        background-color: #f9f9f9;
        width: 60px;
        text-align-last: right;
    }

    .stringSelection {
        display: flex;
        justify-content: center;
        text-align: center;
    }

    .includeStringsText {
        width: 125px;
    }

    .stringButtons {
        margin-left: 10px;
        margin-top: 2px;
    }

    button {
        width: 22px;
        height: 25px;
        margin: 1px;
        padding: 0px;
    }

    .pressed {
        background-color: #969696;
    }
</style>